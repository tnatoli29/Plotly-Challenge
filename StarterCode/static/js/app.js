//Create dropdown for dataset
function init() {
  //Grab the dropdown select element
  var dropdown = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var names = data.names;

    names.forEach((sample) => {
      dropdown
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    //Build the charts with the first sample
    var firstSample = names[0];
    buildCharts(firstSample);
  });
}

function buildCharts(sample) {
// Construct bar chart
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultAr = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultAr[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yValues = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yValues,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
        color: 'rgb(0,150,150)'
        }
      }
    ];

    var barLayout = {
      title: "Top 10 OTUs Found in this Individual",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Run init function
init();