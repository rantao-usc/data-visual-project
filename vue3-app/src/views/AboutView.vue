<template>
  <div class="about">
    <h1 class="mt-5 mb-5">Vite+Vue3 example</h1>

    <div class="mt-5">
      This example was created using <a target="_blank" href="https://vitejs.dev/">Vite</a> and <a target="_blank"
        href="https://vuejs.org/">Vue 3</a>. I followed the <a href="https://vitejs.dev/guide/" target="_blank">Vite:
        Getting Started</a> to generate a Vue App and
      then added the charts:</div>

    <ol>
      <li>Install vite globally with:
        <pre><code>sudo npm install -g vite@latest</code></pre>
      </li>
      <li>Scaffold a Vue project with:
        <pre><code>npm create vite@latest</code></pre>
      </li>
      <li>Select the following:
        <pre><code>✔ Project name: vue3-app
✔ Select a framework: › Vue
✔ Select a variant: › JavaScript</code></pre>
      </li>
      <li>Open README.md and follow <code>Recommended IDE Setup</code></li>
      <li>In the terminal run the dev server:
        <pre><code>cd vue3-app
npm install
npm run dev</code></pre>
      </li>
      <li>Install bootstrap and configure:
        <pre><code>cd vue3-app
npm install bootstrap bootstrap-icons
code main.js #add imports for bootstrap</code></pre>
      </li>
      <li>Add pages, by duplicating an existing view in <code>views</code>, adding a route in
        <code>router/index.js</code>,
        adding an entry in the navigation in <code>App.vue</code>, then when the page is working adding the code for the
        chart.</li>
    </ol>

    Table pages and charts demonstrated.

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Page</th>
          <th scope="col">Vue API</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td><a @click="$router.push('htmlchart')">HTML Chart</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Options API</a></td>
          <td>HTML bar chart with divs</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td><a @click="$router.push('htmlchartcomp')">HTML Chart Comp</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Composition API</a></td>
          <td>HTML bar chart with divs</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td><a @click="$router.push('d3chart')">D3 Chart</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Options API</a></td>
          <td>D3 bar chart</td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td><a @click="$router.push('d3chartcomp')">D3 Chart Comp</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Composition API</a></td>
          <td>D3 bar chart</td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td><a @click="$router.push('smallmultiples')">Small Multiples</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Composition API</a></td>
          <td>D3 reusable bar chart as small multiples</td>
        </tr>
        <tr>
          <th scope="row">6</th>
          <td><a @click="$router.push('map')">Mapbox Map</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Options API</a></td>
          <td>Mapbox map</td>
        </tr>
        <tr>
          <th scope="row">7</th>
          <td><a @click="$router.push('mapcomp')">Mapbox Map Comp</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Composition API</a></td>
          <td>Mapbox map</td>
        </tr>
        <tr>
          <th scope="row">6</th>
          <td><a @click="$router.push('deckmapcomp')">Mapbox + Deck.gl Map Comp</a></td>
          <td><a target="_blank" href="https://vuejs.org/guide/introduction.html#options-api">Composition API</a></td>
          <td>Mapbox map with Deck.gl scatterplot layer</td>
        </tr>
      </tbody>
    </table>

    <h2>References</h2>
    <ul>
      <li><a target="_blank" href="https://vitejs.dev/guide/">Vite</a></li>
      <li><a target="_blank" href="https://vuejs.org/">Vue.js</a></li>
      <li><a target="_blank" href="https://pinia.vuejs.org/">Pinia Vue store</a></li>
      <li><a target="_blank" href="https://router.vuejs.org/">Vue Router</a></li>
    </ul>

  </div>
</template>

<style scoped>
h1 {
  text-shadow:
    0 0 5px #0f0,
    0 0 10px #0f0,
    0 0 20px #0f0,
    0 0 40px #0f0,
    0 0 80px #0f0,
    0 0 90px #0f0,
    0 0 100px #0f0,
    0 0 150px #0f0;
}

pre {
  background-color: black;
}
</style>
