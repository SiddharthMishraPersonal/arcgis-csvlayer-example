/*
 * Copyright © 2018 Siddharth Mishra., USA
 */
import { LayerProviderType } from './layer-types/layer-provider-type';

export class LayerConstants {
  public static readonly DEMO_INCIDENT_HEATMAP_LAYER = 'DEMO-incidents-heatmap-layer';
  public static readonly DEMO_INCIDENT_SIMPLE_POINT_LAYER = 'DEMO-incidents-simple-point-layer';
  public static readonly DEMO_INCIDENT_PREDICTION_LAYER = 'DEMO-incidents-prediction-layer';
  public static readonly DEMO_MINI_INCIDENT_POINT_LAYER = 'DEMO-mini-incidents-point-layer';
}

export class EsriConstants {
  public static readonly FEATURE = 'Feature Layer';
  public static readonly GROUP = 'Group';
  public static readonly DYNAMIC_MAP_SERVICE = 'Dynamic Map Service';
  public static readonly IMAGE_MAP_SERVICE = 'Image Map Service';
  public static readonly WEBMAP = 'Web Map';
  public static readonly TILE_XYZ = 'TiledMapService';
  public static readonly TILE = 'Base Tile';
  public static readonly VECTOR_TILE = 'Vector Tile Layer';
  public static readonly LOOP = 'Loop';
  public static readonly RADAR = 'Radar';
  public static readonly ARCGIS_API_VERSION = '4.8';
  public static readonly ARCGIS_API_LOCATION = 'https//js.arcgis.com/' + EsriConstants.ARCGIS_API_VERSION + "/";
  public static readonly DEFAULT_PORTAL_URL = 'https://www.arcgis.com';
  public static readonly ARCGIS_PROVIDER_NAME: LayerProviderType = 'ArcGIS';
  public static readonly FEATURE_TYPE = 'feature';
  public static readonly VISIBILITY_PROPERTY_NAME = 'visible';
  public static readonly LOAD_ERROR_PROPERTY_NAME = 'loadStatus';
  public static readonly LAYER_VIEW_CREATE_EVENT_NAME = 'layerview-create';
  public static readonly KML = 'KML';
  public static readonly WMS = 'Web Map Service (WMS)';
  public static readonly WMTS = 'Web Map Tile Service (WMTS)';

  public static readonly DEFAULT_POPUP_LAYOUT = {
    dockEnabled: true,
    dockOptions: {
      // Disables the dock button from the popup
      buttonEnabled: false,
      // Ignore the default sizes that trigger responsive docking
      breakpoint: false,
      position: 'top-right'
    }
  };

  public static readonly LABEL_STYLE = {
    color: 'black',
    font: {
      size: 12,
      family: 'sans-serif'
    },
    yoffset: -48 / 2
  };
}

export enum EsriModules {
  Map = 'esri/Map',
  Config = 'esri/config',
  FeatureLayer = 'esri/layers/FeatureLayer',
  CSVLayer = 'esri/layers/CSVLayer',
  Collection = 'esri/core/Collection',
  TextSymbol = 'esri/symbols/TextSymbol',
  Color = 'esri/Color',
  PictureMarkerSymbol = 'esri/symbols/PictureMarkerSymbol',
  Point = 'esri/geometry/Point',
  Polyline = 'esri/geometry/Polyline',
  Polygon = 'esri/geometry/Polygon',
  Circle = 'esri/geometry/Circle',
  SimpleMarkerSymbol = 'esri/symbols/SimpleMarkerSymbol',
  SimpleLineSymbol = 'esri/symbols/SimpleLineSymbol',
  SimpleFillSymbol = 'esri/symbols/SimpleFillSymbol',
  Graphic = 'esri/Graphic',
  WebMap = 'esri/WebMap',
  Layer = 'esri/layers/Layer',
  WatchUtils = 'esri/core/watchUtils',
  MapView = 'esri/views/MapView',
  SceneView = 'esri/views/SceneView',
  TileLayer = 'esri/layers/TileLayer',
  WebTitleLayer = 'esri/layers/WebTileLayer',
  ImageryLayer = 'esri/layers/ImageryLayer',
  WebMercatorUtils = 'esri/geometry/support/webMercatorUtils',
  GeometryEngine = 'esri/geometry/geometryEngine',
  SpatialReference = 'esri/geometry/SpatialReference',
  Extent = 'esri/geometry/Extent',
  MapImageLayer = 'esri/layers/MapImageLayer',
  ScaleBarWidget = 'esri/widgets/ScaleBar',
  SearchWidget = 'esri/widgets/Search',
  BasemapGalleryWidget = 'esri/widgets/BasemapGallery',
  ExpandWidget = 'esri/widgets/Expand',
  LayerListWidget = 'esri/widgets/LayerList',
  LegendWidget = 'esri/widgets/Legend',
  TrackWidget = 'esri/widgets/Track',
  HomeWidget = 'esri/widgets/Home',
  Widget = 'esri/widgets/Widget',
  Viewpoint = 'esri/Viewpoint',
  GroupLayer = 'esri/layers/GroupLayer',
  LocalBasemapsSource = 'esri/widgets/BasemapGallery/support/LocalBasemapsSource',
  Basemap = 'esri/Basemap',
  VectorTileLayer = 'esri/layers/VectorTileLayer',
  SimpleRenderer = 'esri/renderers/SimpleRenderer',
  IdentityManager = 'esri/identity/IdentityManager',
  ServerInfo = 'esri/identity/ServerInfo',
  SketchViewModel = 'esri/widgets/Sketch/SketchViewModel',
  GraphicsLayer = 'esri/layers/GraphicsLayer',
  Draw = 'esri/views/2d/draw/Draw',
  IdentifyTask = 'esri/tasks/IdentifyTask',
  IdentifyParameters = 'esri/tasks/support/IdentifyParameters',
  QueryTask = 'esri/tasks/QueryTask',
  Query = 'esri/tasks/support/Query',
  KMLLayer = 'esri/layers/KMLLayer',
  WMSLayer = 'esri/layers/WMSLayer',
  WMTSLayer = 'esri/layers/WMTSLayer',
  HeatmapRenderer = 'esri/renderers/HeatmapRenderer'
}
export const esriModulesNames = Object.keys(EsriModules);

export type WidgetPosition =
  'auto'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

