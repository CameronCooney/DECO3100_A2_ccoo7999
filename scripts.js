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
    var country_data0 = csv_data.filter(d => d.country == "United States");
    var country_data1 = csv_data.filter(d => d.country == "Norway");
    var country_data2 = csv_data.filter(d => d.country == "Australia");


    //Add our main data trace
    var trace0 = [{
        x: country_data0.map(d => d.year),
        y: country_data0.map(d => d.mortality),
        mode: 'lines',
        name:'United States',
        type: 'scatter',
        line: {
            color: lineColors.orange  
        }
    }]
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
    var trace2 = [{
        x: country_data2.map(d => d.year),
        y: country_data2.map(d => d.mortality),
        mode: 'lines',
        name: 'Australia',
        type: 'scatter',
        line: {
            color: lineColors.yellow 
        }
    }]
    var data = [trace0, trace1, trace2];

    var layout1 = {
        title: "Child Mortality in the Norway compared to the U.S. and Australia",
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


    //Draw the plot at our div
    Plotly.newPlot('vis1', data, layout1, config);
}

function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});


}


//Load the csv data and when loaded: run the make_plot function with that data
Plotly.d3.csv("mortality.csv", make_plot);
