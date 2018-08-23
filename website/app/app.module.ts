import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CsvLayerComponent } from './csv-layer/csv-layer.component';
import { EsriLazyApiLoader } from '../common/esri/esri-lazy-api-loader';
import { EsriModulesRegistry } from '../common/esri/esri-module-registry';
import { WebmapComponent } from './webmap/webmap.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvLayerComponent,
    WebmapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    EsriLazyApiLoader,
    EsriModulesRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
