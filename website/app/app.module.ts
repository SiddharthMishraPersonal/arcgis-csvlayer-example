import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CsvLayerComponent } from './csv-layer/csv-layer.component';
import { EsriLazyApiLoader } from '../common/esri/esri-lazy-api-loader';
import { EsriModulesRegistry } from '../common/esri/esri-module-registry';
import { WebmapComponent } from './webmap/webmap.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
  declarations: [
    AppComponent,
    CsvLayerComponent,
    WebmapComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    EsriLazyApiLoader,
    EsriModulesRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
