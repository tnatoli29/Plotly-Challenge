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
  });
}





// Run init function
init();