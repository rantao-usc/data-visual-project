<template>
    <div id="PredictiveAnalysisCharts">
      <h1 class="mt-3">Our Analysis</h1>
        <p>The visualisations below show our process from exploring gas prices and electric vehicle data to gain some insights and do some forecasting on the prices and count. We have shown a summary of some of the 
          analysis below.
        The notebook for this can be accessed by clicking <a href="https://colab.research.google.com/drive/14kRb6bsNe_zPFzZKyygjSiA0OK2cSpFZ?usp=sharing" target="_blank">here.</a></p>
      <div>
        <b-container>
          <b-row>
            <b-col><b-card
                    title="CO2 Emission vs Number of Electric vehicles"
                    img-src="card_component_elements/CO2_vs_EV.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="Number of Electric vehicles vs Gas Price"
                    img-src="card_component_elements/ev_price.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="CO2 Emission vs number of Electric vehicles"
                    img-src="card_component_elements/co2_emission_vs_amount_of_ev.png"
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
                    title="Gas Price vs number of Electric vehicles"
                    img-src="card_component_elements/gas_price_vs_amount_of_ev.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="GDP vs number of Electric vehicles"
                    img-src="card_component_elements/gdp_vs_amount_of_ev.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  </b-card></b-col>
                  <b-col> <b-card
                    title="Error Rate Chart for Multivariable (R-squared value)"
                    img-src="card_component_elements/multivariable.jpg"
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
  margin: 5px 15px;
  /* padding: 10px */
}
.card .read-more:hover{
    font-size: 14px;
}

.card:hover{
    box-shadow: 8px 8px 8px green;
    transform:scale(1.2);
}

.card{
  transition:.3s;
  margin: 0.5rem;
}
</style>