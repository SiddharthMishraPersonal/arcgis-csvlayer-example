/* global require, module, __dirname */
/* jslint node: true */

/**
 * Third party dependencies
 */

'use strict';

/**
 * Third party dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const swaggerTools = require('swagger-tools');
const Path = require('path');

/**
 * Utility dependencies
 */
const swaggerYAMLFiles = require('./swagger');
const logger = require('./lib/logger');
const config = require('./config');

/**
 * Controller imports
 */
const IncidentsCsvController = require('./controllers/IncidentsCsvController');

const httpApp = express();


/**
 * Initializes the app and the database.
 */
async function initialize() {
  try {
    setUpApplicationVars();
    await setupPreControllerActions();
    await bindControllers(await setupMiddleware());
    await setupPostControllerActions();

    httpApp.listen(config.port, () => {
      logger.debug(`APP:: API is listening on ${config.host}:${config.port}`);
      logger.info(`APP:: API started`);
    });
  } catch (err) {
    logger.error('APP:: App initialization method throws error:', err);
  }
}

/**
 * Set vars up for the application
 */
function setUpApplicationVars() {
  logger.trace('APP:: Setting up configuration variables from command line arguments.');
  let arg1;
  let arg2;
  if (process.argv.length > 2) {
    arg1 = process.argv[2];
    if (arg1.indexOf('host=') > -1) {
      config.host = arg1.split('=')[1];
    } else if (arg1.indexOf('port=') > -1) {
      config.port = arg1.split('=')[1];
    } else {
      logger.info('Arguments are: host and port. /nExample: node app.js host=localhost port=8080.' +
        ' If not provided, application will take if from config.');
    }

    if (process.argv.length > 3) {
      arg2 = process.argv[3];
      if (arg2.indexOf('host=') > -1) {
        config.host = arg2.split('=')[1];
      } else if (arg2.indexOf('port=') > -1) {
        config.port = arg2.split('=')[1];
      } else {
        logger.info('Arguments are: host and port. /nExample: node app.js host=localhost port=8080.' +
          ' If not provided, application will take if from config.');
      }
    }
  }

  logger.trace('APP:: Setting up application variables');
  httpApp.locals.config = config;
  httpApp.locals.logger = logger;
  logger.trace(httpApp.locals);
}

/**
 * Sets up the middleware, most importantly the swaggerTools middleware
 * @return {object} swaggerMiddleware : the swaggerTools middleware object
 */
async function setupMiddleware() {
  await setupWebsite();

  logger.trace('APP:: Setting up middleware');
  /*
   * Configure request size
   */
  httpApp.use(bodyParser.json({
    limit: config.maxRequestSize,
  }));

  /*
   * Configure swagger
   */
  let swaggerDocument = await swaggerYAMLFiles.convertYamlToJson();

  /**
   * @param {object} document : a well formed swagger document
   * @return {Promise} swaggerMiddleware : Promise that resolves to a swaggerTools middleware object
   */
  let promisifiedSwaggerToolsInitialization = function (document) {
    return new Promise((resolve, reject) => {
      swaggerTools.initializeMiddleware(document, resolve);
    });
  };
  let swaggerMiddleware = await promisifiedSwaggerToolsInitialization(swaggerDocument);

  httpApp.use(swaggerMiddleware.swaggerMetadata());

  httpApp.use(
    swaggerMiddleware.swaggerUi({
      apiDocs: '/api/arcgis/v1/api-docs',
      swaggerUi: '/api/arcgis/v1/docs',
    })
  );

  httpApp.use(swaggerMiddleware.swaggerValidator());

  logger.trace('APP:: Middleware established');
  return swaggerMiddleware;
}

/**
 * Added angular 6 website's DIST folder to Express root.
 * @return {Promise<*>} : Returns promise.
 */
async function setupWebsite() {
  logger.trace('APP:: Setting up website with express.');
  return new Promise((resolve, reject) => {
    try {
      const distPath = Path.join(__dirname, 'dist');
      console.log(distPath);
      httpApp.use(express.static(distPath)); // Website's dist folder.
      httpApp.get('/', (req, res, next) => {
        res.redirect('/');
        next();
      });
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
}

/**
 * Sets up those actions that need to be taken before the controllers execute.
 * This includes setting up metrics and adding any needed parameters to the request.
 */
async function setupPreControllerActions() {
  logger.trace('APP:: Setting up pre-controller actions');

  // Explicitly attach tracked params to the request
  httpApp.use((req, res, next) => {
    let clientId;
    try {
      clientId = jwt.decode(req.headers.authorization.split(' ')[1])['client_id'];
    } catch (err) {
      clientId = 'unknown';
    }
    res.locals.clientId = clientId;
    logger.trace('APP:: clientId for this request attached to request object');
    next();
  });

  logger.trace('APP:: Established pre-controller actions');
}

/**
 * Sets up those actions that need to be taken after the controllers execute.
 * This includes logging any final metrics, any final request decorations, and
 * common swallowing of errors.
 */
async function setupPostControllerActions() {
  logger.trace('APP:: Setting up post-controller actions');

  /**
   * Post-controller failed request handler
   */
  httpApp.use((err, req, res, next) => {
    logger.trace('APP:: Handling controller error.');
    logger.error(`APP:: ERROR: ${JSON.stringify(err)}`);
    let errors = [];
    /* Handle Swagger Errors */
    if (err.failedValidation === true) {
      errors.push({
        error: err.message,
      });
      if (err.results) {
        for (let e of err.results.errors) {
          errors.push({
            error: e.message,
          });
        };
      }
      /* Set 400 for Swagger validation error. */
      res.status(400);
    } else if (err.forbidden) {
      errors.push(err);
      /* Set 403 for Forbidden. */
      res.status(403);
    } else if (err.notFound) {
      errors.push(err);
      /* Set 404 for Not Found. */
      res.status(404);
    } else if (err.allowedMethods) {
      errors.push(err);
      /* Set 405 for Method Not Allowed error. */
      res.status(405);
    } else {
      errors.push({
        error: 'Internal Server error occurred. ',
      });
      /* Set 500 for otherwise unhandled error. */
      res.status(500);
    }
    /* Send response to user. */
    res.json({
      errors: errors,
    });
    logger.trace('APP:: Controller error handled.');
    next();
  });

  logger.trace('APP:: Established post-controller actions');
}

/**
 * Bind controllers to their swagger paths.
 * @param {object} swaggerMiddleware : the swaggerTools middleware object
 */
async function bindControllers(swaggerMiddleware) {
  logger.trace('APP:: Instantiating and binding controllers');

  const getCsvIncidents = new IncidentsCsvController(httpApp.locals);

  httpApp.use(
    swaggerMiddleware.swaggerRouter({
      controllers: {
        IncidentsCsvController_getIncidents: getCsvIncidents.getIncidents.bind(getCsvIncidents),
      },
    })
  );
  logger.trace('APP:: Controllers bound');
}

// Call initialize.
initialize();

module.exports = httpApp;
