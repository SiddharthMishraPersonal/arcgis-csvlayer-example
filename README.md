
# arcgis-csvlayer-example
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

# Purpose
This angular project is created to make a component which will host a map with Heatmap layer.
This project has been created to get help from the community to fix the heatmap issue.

## Development server

The website runs under expressJs node server. To launch website follow the steps:

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run start`.

Last command is composite of 2 commands: `npm run build && node app.js`
The command `npm run build` will run `ng build` and put build artifacts under `./dist` folder. 
The command `node app.js` will start the ExpressJs server at http://localhost:3000.

Hit http://localhost:3000 on browser and it will lauch the website.

## Swagger Docs
http://localhost:3000/api/arcgis/v1/docs/#/

## CSV Data Endpoint
To get csv data hit: http://localhost:3000/api/arcgis/v1/incidents.csv

# Problem:
Unfortunately, the heatmap layer never gets rendered on CSV Layer and the webmap layer which has been copied from the ArcGIS For Developers website: Create a scale-dependent visualization text (https://developers.arcgis.com/javascript/latest/sample-code/visualization-heatmap-scale/index.html)
