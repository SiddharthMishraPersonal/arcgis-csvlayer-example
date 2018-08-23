/*
 * Copyright © 2018 Siddharth Mishra., USA
 */

import { Injectable } from '@angular/core';
import { EsriConstants, EsriModules, esriModulesNames } from './esri-constants';
import esriLoader from 'esri-loader';
import { EsriModulesRegistry } from './esri-module-registry';

@Injectable()
export class EsriLazyApiLoader {
  private modulesLoadPromise: Promise<void>;

  constructor(private esriModulesRegistry: EsriModulesRegistry) {
  }

  async loadAllModules(): Promise<void> {
    if (!this.modulesLoadPromise) {
      this.modulesLoadPromise = this.getLoadPromise();
    }
    return this.modulesLoadPromise;
  }

  private async getLoadPromise() {
    const esriPaths = esriModulesNames.map(key => EsriModules[key]);
    console.log(EsriConstants.ARCGIS_API_LOCATION);
    const esriClasses = await esriLoader.loadModules(esriPaths, { url: EsriConstants.ARCGIS_API_LOCATION });
    this.register(esriClasses);
    return null;
  }

  private register(esriClasses: any[]) {
    esriClasses.forEach((module, index) => {
      const enumName = esriModulesNames[index];
      this.esriModulesRegistry.addModule(EsriModules[enumName], module);
    });
  }
}

