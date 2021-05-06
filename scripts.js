/*LINE GRAPH COLORS*/

const lineColors = {
    darkblue: "#67b7b6",
    yellow: "#ffd405",
    orange: "#ff9912"
}

/*PLOTLY SETTINGS*/
const config = {
    displayModeBar: false,
    responsive: true 

}




function make_plot(csv_data){
    //Filter our csv data for a particular country
    //Try logging country_data to the console to see what's in it
   
    var country_data1 = csv_data.filter(d => d.country == "Norway");
    



        //Add our main data trace
    var trace1 = [{
        x: country_data1.map(d => d.year),
        y: country_data1.map(d => d.mortality),
        mode: 'lines',
        name:'Norway',
        type: 'scatter',
        line: {
            color: lineColors.darkblue  
        }
    }]


    var layout1 = {
        title: "Child Mortality in Norway over the last 70 years with Future Predictions",
        xaxis: {
            autorange: true,
            rangeselector: {
                buttons: [{
                    count: 10,
                    label: '10 Years', 
                    step: 'year',
                    stepmode: 'forward',
                },{
                    count: 50,
                    label: '50 Years',
                    step: 'year',
                    stepmode:'forward',
                },{
                    count: 70,
                    label: 'all',
                    step: 'year',
                    stepmode: 'forward',
                }]
            },
            type: 'date',
        }
    }


    //FIRST PLOT
    Plotly.newPlot('vis1', trace1, layout1, config);
}

function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});


}





//VIS 2
function make_plot(csv_data){
    //Filter our csv data for a particular country
    //Try logging country_data to the console to see what's in it
    var country_data2 = csv_data.filter(d => d.country == "United States");



    //Setting up graph 2 ft. US Stats, code sourced from Week 8 tutorial and Week 9 tutorial 
    var trace2 = [{
        x: country_data2.map(d => d.year),
        y: country_data2.map(d => d.mortality),
        mode: 'lines',
        name:'United States',
        type: 'scatter',
        line: {
            color: lineColors.orange  
        }
    }]


    var layout2 = {
        title: "Child Mortality in the United States over the last 70 years with Future Predictions",
        xaxis: {
            autorange: true,
            rangeselector: {
                buttons: [{
                    count: 10,
                    label: '10 Years', 
                    step: 'year',
                    stepmode: 'forward',
                },{
                    count: 50,
                    label: '50 Years',
                    step: 'year',
                    stepmode:'forward',
                },{
                    count: 70,
                    label: 'all',
                    step: 'year',
                    stepmode: 'forward',
                }]
            },
            type: 'date',
        }
    }


    //SECOND PLOT
    Plotly.newPlot('vis2', trace2, layout2, config);
}
function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});


}

//Load the csv data and when loaded: run the make_plot function with that data
Plotly.d3.csv("mortality.csv", make_plot);