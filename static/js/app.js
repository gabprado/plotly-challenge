function buildMetadata(sample) {
  let metadata = d3.select("#sample-metadata");
  metadata.html("");
  d3.json("/metadata/" + sample).then((data) => {
      Object.entries(data).forEach(([key, value]) => {
          metadata.append("p").text(`${key} : ${value}`)
      })
      buildGauge(data.WFREQ)
  });
}

function buildCharts(sample) {
  //Bubble chart
  d3.json("/samples/" + sample).then((sample_data) => {
      let trace1 = {
          x: sample_data.otu_ids,
          y: sample_data.sample_values,
          mode: "markers",
          text: sample_data.otu_labels,
          marker: {
              color: sample_data.otu_ids,
              size: sample_data.sample_values,
              colorscale: "Viridis"
          }
      };
      let data = [trace1];
      let layout = {
          showlegend: false,
      };
      Plotly.newPlot("bubble", data, layout);
      //Pie Chart
      data = [{
          values: sample_data.sample_values.slice(0, 10),
          labels: sample_data.otu_ids.slice(0, 10),
          hovertext: sample_data.otu_labels.slice(0, 10),
          type: "pie"
      }];
      Plotly.newPlot("pie", data);
  });
}

function init() {
  let selector = d3.select("#selDataset");
  d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
          selector
              .append("option")
              .text(sample)
              .property("value", sample);
      });
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}
init();