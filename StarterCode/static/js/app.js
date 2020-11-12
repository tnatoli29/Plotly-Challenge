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
    buildMetadata(firstSample);
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

  // Construct bubble chart
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Picnic"
        }
      }
    ];
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select sample-metadata
    var sampleMeta = d3.select("#sample-metadata");

    // Use .html("") to clear existing data
    sampleMeta.html("");

    // Use Object.entries to add each key and value pair
        Object.entries(result).forEach(([key, value]) => {
      sampleMeta.append("h6").text(`${key}: ${value}`);
    });
  });
}

function optionChanged(newSample) {
  // Change data in charts and graphs based on selected Subject ID
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Run init function
init();