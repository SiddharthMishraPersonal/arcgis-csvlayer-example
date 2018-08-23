import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { EsriLazyApiLoader } from '../../common/esri/esri-lazy-api-loader';
import { EsriModulesRegistry } from '../../common/esri/esri-module-registry';
import { EsriConstants, EsriModules } from '../../common/esri/esri-constants';

@Component({
  selector: 'app-csv-layer',
  templateUrl: './csv-layer.component.html',
  styleUrls: ['./csv-layer.component.css'],
  host: { '[class.map-base-container]': 'true' },
})
export class CsvLayerComponent implements OnInit, AfterViewInit {
  @ViewChild('containerInner') container: ElementRef;
  private mapView;
  private eventListeners = [];
  private map;
  protected mapInstance;
  constructor(private esriLazyApiLoader: EsriLazyApiLoader,
    private esriModulesRegistry: EsriModulesRegistry) {
    console.log('adfasdf');

  }

  async ngOnInit() {

  }

  ngAfterViewInit() {
    this.esriLazyApiLoader.loadAllModules()
      .then(async () => {
        console.log('loadAllModules');
        this.registerModules();
        this.setMapType('osm');
        await this.createMapView();
        console.log('map and view created');
        await this.registerLayers();
        console.log('Layer created');
        await this.setupLegend();
      })
    console.log('ngAfterViewInit:- Completed!');
  }

  private registerModules() {
    const mapModule = this.esriModulesRegistry.getModule(EsriModules.Map);
    this.map = new mapModule();
    console.log('Map Created');
  }

  private setMapType(basemap: any) {
    if (this.getMapInstance()) {
      this.getMapInstance().basemap = basemap;
    }
  }

  getMapInstance() {
    return this.map;
  }

  async createMapView() {
    const MapView = this.esriModulesRegistry.getModule(EsriModules.MapView);
    this.mapView = new MapView({
      container: this.container.nativeElement,
      center: [-83.859328, 33.596792],
      zoom: 11,
      map: this.map
    });

    this.mapView.when().then(() => {
      console.log(this.mapView.map.layers);
      const layer = this.mapView.map.layers.getItemAt(0);
      const heatmapRenderer = layer.renderer.clone();
      console.log(heatmapRenderer);

      const simpleRenderer = {
        type: "simple",
        symbol: {
          type: "simple-marker",
          color: "#c80000",
          size: 7
        }
      };

      this.mapView.watch("scale", (newValue) => {
        console.log(layer.renderer.type);
        layer.renderer = newValue <= 72224 ? simpleRenderer :
          heatmapRenderer;
      });

      const LayerList = this.esriModulesRegistry.getModule(EsriModules.LayerListWidget);
      var layerList = new LayerList({
        view: this.mapView
      });

      // Add widget to the top right corner of the view
      this.mapView.ui.add(layerList, "top-right");

    });

    console.log('Map is created');
    return Promise.resolve();
  }

  async registerLayers() {
    const template = {
      title: "Marriage in NY, Zip Code: {postalCode}",
      content: "<p>As of <b>{date}</b> of the" +
        " population in this zip code is married.</p>" +
        "<ul><li>{city} people are married</li>" +
        "<li>{state} have never married</li>" +
        "<li>{postalCode} are divorced</li><ul>";
    };

    const renderer = {
      type: "heatmap",
      colorStops: [{
        color: "rgba(63, 40, 102, 0)",
        ratio: 0
      },
      {
        color: "#472b77",
        ratio: 0.083
      },
      {
        color: "#4e2d87",
        ratio: 0.166
      },
      {
        color: "#563098",
        ratio: 0.249
      },
      {
        color: "#5d32a8",
        ratio: 0.332
      },
      {
        color: "#6735be",
        ratio: 0.415
      },
      {
        color: "#7139d4",
        ratio: 0.498
      },
      {
        color: "#7b3ce9",
        ratio: 0.581
      },
      {
        color: "#853fff",
        ratio: 0.664
      },
      {
        color: "#a46fbf",
        ratio: 0.747
      },
      {
        color: "#c29f80",
        ratio: 0.830
      },
      {
        color: "#e0cf40",
        ratio: 0.893
      },
      {
        color: "#e0cf40",
        ratio: 0.913
      },
      {
        color: "red",
        ratio: 1
      }
      ],
      maxPixelIntensity: 25,
      minPixelIntensity: 0
    };

    let url = './api/arcgis/v1/incidents.csv';
    const ESRICONFIG = this.esriModulesRegistry.getModule(EsriModules.Config);
    const esriConfig = ESRICONFIG;
    esriConfig.request.corsEnabledServers.push(url);

    const CSVLayer = this.esriModulesRegistry.getModule(EsriModules.CSVLayer);
    const layer = new CSVLayer({
      url: url,
      title: "Incidents as HeatMap",
      copyright: "Copyright © 2018 Siddharth Mishra.",
      popupTemplate: template,
      renderer: renderer,
      opacity: 0.6
    });

    this.mapView.map.add(layer);

    return new Promise(resolve => layer.when(() => {
      return this.mapView.whenLayerView(layer).then(() => {
        console.log('Layer is in view!');
        return resolve();
      });
    }));
  }

  async setupLegend() {
    const Legend = this.esriModulesRegistry.getModule(EsriModules.LegendWidget);
    this.mapView.ui.add(new Legend({
      view: this.mapView
    }), "bottom-left");



    console.log('setupLegend');
    return new Promise(resolve => resolve());
  }

}
