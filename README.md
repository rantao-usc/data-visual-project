[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9295136&assignment_repo_type=AssignmentRepo)
# DSCI 554 Project

Team name: Data Wizards

Team members: Vedaanti Baliga, Sofian Ghazali, Ran Tao, Kyle Brooks

- Vedaanti Baliga <vbaliga@usc.edu>
- Sofian Ghazali <sghazali@usc.edu>
- Ran Tao <taoran@usc.edu>
- Kyle Brooks <kylebroo@usc.edu>

## Project summary (max 250 words)
This project investigates how electric vehicles are related to other entities of society: mainly carbon dioxide (CO2) emissions and
gasoline prices. We develop a dashboard that showcases these relationships, as a proponent for electric cars. Additionally, we develop models
to see if we are able to predict EV counts from these entities.

## Artifacts

- Demo: [dev set-up instructions](vue3-app/README.md)
- Model performance notebooks: [Link for notebook](model-performance-notebooks) | [Link for online google colab notebook](https://colab.research.google.com/drive/14kRb6bsNe_zPFzZKyygjSiA0OK2cSpFZ?usp=sharing)
- Paper: [Overleaf read-only link (if applicable)](https://www.overleaf.com/read/bfvbcgpqdsym) and [paper PDF](paper/paper.pdf)
- Video: [YouTube link](https://youtu.be/07OsRnzbzSk)

## Contributions
**Note** - code contributions can be tracked in each individuals' branch (Vedaanti worked out of the main/master branch)

### Demo

[Vedaanti Baliga](mailto:vbaliga@usc.edu):

- Developed the Vue app (dashboard, interactive sidebar, card components etc.)
- Integrated the d3/html charts and ML analysis of all members into the Vue dashboard.
- Created the proportional symbol map for electric vehicle counts (multiple maps).
- Added a hover effect to Kyle's Pie Chart.

[Kyle Brooks](mailto:kylebroo@usc.edu):

- Created d3 choropleth chart with slider for transportation CO2 emissions statewide
- Created d3 pie chart with dropdown for CO2 emissions by sector 

[Sofian Ghazali](mailto:sghazali@usc.edu):

- Created d3 multi-line chart for showcasing average fuel prices over time. I integrated dropdown option for different categories and added d3 update-transition for line charts.
- Designed zoomable circle packing from observable d3 but added different color options using d3 color scale to highlight different US states and their respectives energy source proportions.


[Ran Tao](mailto:taoran@usc.edu):

- Created d3 scatter plot and linear regression line for two linear regression models
  - Gas price vs Amount of Electric cars
  - Amount of Electric cars vs CO2 emissions

### Model performance analysis

[Ran Tao](mailto:taoran@usc.edu):

- Built three single variable polynomial regression models: Gas price vs Amount of Electric cars, GDP vs Amount of Electric cars, and CO2 emissions vs Amount of Electric cars
- Trained each polynomial regression models with 5-10 different degrees, plotted the fitted lines for each degree, and calcuate the R squared of each degree
- Selected the best degree for each polynomial regression model based on R squared
- Built three multiple variable regression model using one to three features
- Conducted 5-fold Cross Validation to calculate the average R squared for each model
- Determine the number of features gives the best model performance

[Sofian Ghazali](mailto:sghazali@usc.edu):

- Documented the notebook about observations from EDA charts. For example, explained trends occurring from scatterplot-matrix and discussed data distribution. 
- Conducted EDA and pre-processing for ML phase and generated scatterplot-matrix/boxplots/tables. 
- Coordinated with Ran to design simple linear & polynomial regression. 
- Added grid layout with legend for Ran's predictive model chart. 


### Paper

[Kyle Brooks](mailto:kylebroo@usc.edu):

- Introduction
- Data
- Conclusion
- Abstract
- Related Work
- Converted google doc of paper to latex format
- Performed formatting of paper in latex (added table for data, visualizations, etc.)
- Managed references in bibliography 


[Vedaanti Baliga](mailto:vbaliga@usc.edu):

- Approach : Frontend designing approach
- System

[Sofian Ghazali](mailto:sghazali@usc.edu):

- Introduction
- Data
- Approach: Machine Learning Approach (Data Exploration and ML Model Choice)
- Results
- Conclusion

[Ran Tao](mailto:taoran@usc.edu):
- Approach: Machine Learning Approach
- Results


### Video

[Vedaanti Baliga](mailto:vbaliga@usc.edu):
- Introduced the problem statement and the dashboard. Explained the proportional map as well.
- Recorded video
- Edited and uploaded video to YouTube

[Kyle Brooks](mailto:kylebroo@usc.edu):
- Explained enviornmental draw towards EVs.
- Explained choropleth and pie chart

[Sofian Ghazali](mailto:sghazali@usc.edu):
- Explained impact of current fuel prices on consumers through multi-line chart.
- Highlighted an additional consideration of electricity energy sources that power EVs. This was to help consumers understand if EVs are right choice for their state from an environment standpoint.

[Ran Tao](mailto:taoran@usc.edu):
- Explained two linear regression models on the dashboard
- Explained three single variable polynomial regression model and one multi variable regression model on the notebook
