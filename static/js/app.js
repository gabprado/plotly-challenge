function buildMetadata(sample) {
  let metadata = d3.select("#sample-metadata")
  metadata.html("")
  d3.json("/metadata/"+sample).then((data) => {
    Object.entries(data).forEach(([key,value]) => {
      metadata.append("p").text(`${key} : ${value}`)
    })
  })


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

//Bubble chart
  d3.json("/samples/"+sample).then((sample_data) => {
  let trace1 = {
    x: sample_data.otu_ids,
    y: sample_data.sample_values,
    mode: 'markers',
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
    height: 600,
    width: 1600
  };
  Plotly.newPlot("bubble", data, layout);
})
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
