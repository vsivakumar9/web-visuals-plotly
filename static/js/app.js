//init function to execute on first load of index.html.
function init() {
  // Grab a reference to the dropdown select element
  console.log("in init section.")
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  // d3.json("/names").then((sampleNames) => {
  //   sampleNames.forEach((sample) => {
  //     selector
  //       .append("option")
  //       .text(sample)
  //       .property("value", sample);
  //   });
  Plotly.d3.json("/names",function(error,response){
    if(error) console.warn(error);
    var dropdown_select = Plotly.d3.select("#selDataset");
    /*dropdown_select.data(response)
                    .enter()
                    .append("option")
                    .attr("value",data)
                    .text(data)
    */
   for(var i=0;i<response.length;i++){
       dropdown_select.append("option").attr("value",response[i]).text(response[i]);
   }
   optionChanged(response[0]);

    // Use the first sample from the list to build the initial plots
    // const firstSample = sampleNames[0];
    // buildMetadata(firstSample);
    // Plotpie(firstSample);
  });
}

function buildMetadata(sample) {
  console.log("in buildMetadata:  ")
  console.log("sample:  " + sample)
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url="/metadata/"+sample;

  console.log(url);
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(url).then(function(response){
    // if(error) {console.warn(error)};
    console.log(response);
    var metadata_Sample= d3.select("#sample-metadata");
    // Remove old metadata
    metadata_Sample.selectAll("p").remove();

    for(var key in response){
        if(response.hasOwnProperty(key)){
            metadata_Sample.append("p").text(key + ":   " + response[key]);
        }
    }
    console.log("Exiting  buildMetadata   ")
});

}  
    
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    

function buildCharts(sample) {
  //  Format the data for Plotly
  //      layout = {
  //      height: 600,
  //      width: 800
  //  }
  //  plot_trace = {
  //      "data": data.otu_ids,
  //      "values": data.sample_values,
  //      "labels": data.otu_labels,
  //      "type": "pie"
  // # }
  // #Plotly.plot("pie", data, layout);
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function Plotpie(sample){
  console.log("starting of plot for Pie Chart");
  var descriptions=[];
  // Plotly.d3.json("/otu",function(error,response){
  //     descriptions= response;
  // })
  d3.json("/samples/" + sample).then(function(response){
    //   if(error) console.warn(error);
    console.log('Plot Pie Inside');
    console.log(response);
      var pielabels=response['otu_ids'].slice(0,11);
      var pievalues=response['sample_values'].slice(0,11);
      var piedescription=response['otu_labels'].slice(0,11);
    //   for(var i=0;i<10;i++){
    //       pielabels.push(response.otu_ids[i]);
    //       pievalues.push(response.sample_values[i]);
    //       piedescription.push(response.otu_labels[i]);
    //       }
      console.log("pielabels " + pielabels) ;
      console.log("pievalues " + pievalues) ;
      console.log("piedescription " + piedescription)   ; 
      var trace1 = { 
          values: pievalues,
          labels: pielabels,
          type:"pie",
          name:"Top 10 Samples",
          textinfo:"percent",
          text: piedescription,
          textposition: "inside",
          hoverinfo: 'label+value+text+percent'
      }
      var data=[trace1];
      var layout={
          height: 450,
          width: 460,
          margin: {
              l: 10,
              r: 10,
              b: 10,
              t: 10,
              pad: 15
            },
      }
      console.log("ready to plot pie chart")
      Plotly.newPlot("pie",data,layout);
  })
}



function optionChanged(newSample) {
  console.log("optionchanged detected and new sample selected")
  console.log("new sample: " + newSample )
  // Fetch new data each time a new sample is selected
  
  buildMetadata(newSample);

  //buildCharts(newSample);
  // Plot the updated pie chart
  Plotpie(newSample);
  //Plot the updated gauge chart
  //Plotgauge(newSample);
  //Plotscatter(newSample);
}

// Initialize the dashboard
init();
