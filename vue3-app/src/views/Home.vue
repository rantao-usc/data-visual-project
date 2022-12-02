<template>
	<main id="Home-page">
		<h1>Effects of Electric Vehicles on Society</h1>
		<p>Electric Vehicles (EVs) are becoming increasingly prominent in modern society, largely due to the 
      environmental impact of gasoline powered vehicles. In this dashboard, we aim to analyze 
      how the number of EVs in the United States might be related to other aspects of society. 
      In particular, we’re analyzing the relationship between EV counts and two other variables: 
      CO2 emissions and gas prices. Additionally, we developed a machine learning model to predict 
      the number of EVs using the gas price. Below is a summary of all the charts.</p>
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
  </main>
</template>
<style scoped>
.card .read-more:hover{
    font-size: 14px;
}

.card:hover{
    box-shadow: 8px 8px 8px green;
    transform:scale(1.2);
}

.card{
  transition:.3s;
  margin: 0.3rem;
}
</style>
