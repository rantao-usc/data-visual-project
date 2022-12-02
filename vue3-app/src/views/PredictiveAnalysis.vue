<template>
    <div id="PredictiveAnalysisCharts">
      <h1 class="mt-3">Our Analysis</h1>
        <p>The visualisations below show our process from exploring '' data to gain some insights and do some forecasting on ''.
        The notebook for this can be accessed by clicking <a href="https://colab.research.google.com/drive/14kRb6bsNe_zPFzZKyygjSiA0OK2cSpFZ?usp=sharing" target="_blank">here.</a></p>
      <div>
        <b-container>
          <b-row>
            <b-col><b-card
                    title="Multi line chart"
                    img-src="card_component_elements/chart1.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="Zoommable circle packing"
                    img-src="card_component_elements/chart2.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="Chloropleth map"
                    img-src="card_component_elements/chart3.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                </b-row>
                <b-row>
            <b-col><b-card
                    title="Pie Chart"
                    img-src="card_component_elements/chart4.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="Proportional chart"
                    img-src="card_component_elements/chart5.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="Predictive analysis"
                    img-src="card_component_elements/chart6.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                </b-row>
        </b-container>
</div>
    </div>
</template>


<script>
import * as d3 from "d3";
export default {
  name: "PredictiveAnalysisCharts"

}
</script>
<style scoped>
#PredictiveAnalysisCharts{
  margin: 10px 0px 25px 25px;
  /* padding: 10px */
}
</style>