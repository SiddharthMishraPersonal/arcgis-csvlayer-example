/*
 * Copyright © 2018 Siddharth Mishra., USA
 */
import { Injectable } from '@angular/core';
import { EsriModules } from './esri-constants';

@Injectable()
export class EsriModulesRegistry {
    private allModules: Map<string, any> = new Map;

    constructor() {
    }

    getModule(type: EsriModules): any {
        return this.allModules.get(type);
    }

    addModule(type: EsriModules, module: any) {
        this.allModules.set(type, module);
    }
}
