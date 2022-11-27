<template>
  <div class="maps">
  
    <div v-if="store.upc">
      <h1 class="mt-4 green">Mapbox and Deck.gl Maps</h1>
  
      <h2>Mapbox Map</h2>

      <div id="map"></div>

      <h2 class="mt-3">Mapbox + Deck.gl Map</h2>
  
      <h2 class="mt-4">Data</h2>

      {{message}}

      <pre><code>{{ store.upc }}</code></pre>
  
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const store = useChartStore();
const message = ref('Data was set from store');

const ZOOM_LEVEL = 15;
const UPC_LON_LAT = [-118.286336, 34.021564];

onMounted(() => {
  if (!store.upc) {
    d3.json('upc.geojson').then(data => {
      store.upc = data;
      message.value = `Data was loaded from file, contains ${store.upc.features.length} features`;

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v11",
      });

      // let upc_map = new mapboxgl.Map({
      //   accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
      //   container: 'map',
      //   style: 'mapbox://styles/mapbox/dark-v11',
      //   center: UPC_LON_LAT,
      //   zoom: ZOOM_LEVEL
      // });

      map.on('load', () => {        
        // map.addSource("footprints", { //get the data from geojson file
        //   type: "geojson",
        //   data: "/upc.geojson"
        // }); 

        // map.addLayer({ //add building footprints
        //   id: 'footprints',
        //   type: 'fill',
        //   source: 'footprints',
        //   layout: {
        //   },
        //   paint: {
        //     'fill-color': '#088',
        //     'fill-opacity': 0.8
        //   }
        // });

        // map.addLayer({ //add building name
        //   'id': 'poi-labels',
        //   'type': 'symbol',
        //   'source': "footprints",
        //   'layout': {
        //     'text-field': ['get', 'aname'],
        //     'text-variable-anchor': ['center'],
        //     'text-radial-offset': 0,
        //     'text-justify': 'auto',
        //   },
        //   paint: {
        //     'text-color': '#ffffff',
        //   }
        // });
      });

      //mapboxMapRef.value = upc_map;
    });
  }
});
</script>

<style scoped>
pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
  background-color: black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* padding-top: 10px; */
  padding-right: 30px;
  padding-bottom: 20px;
  padding-left: 30px;
}

#map {
  width: 100%;
  height: 350px;
}

.map-overlay {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 25%;
  top: 0;
  left: 0;
  padding: 10px;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay h2 {
  line-height: 24px;
  display: block;
  margin: 0 0 10px;
}

.map-overlay .legend .bar {
  height: 10px;
  width: 100%;
  background: linear-gradient(to right, #fca107, #7f3121);
}

.map-overlay input {
  background-color: transparent;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0;
  cursor: ew-resize;
}
</style>
