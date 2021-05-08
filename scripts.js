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




function make_plot0(csv_data){
    //Filter our csv data for a particular country
    //Try logging country_data to the console to see what's in it
   
    var country_data1 = csv_data.filter(d => d.country == "Norway");
        //To normalise our data, we need to know the minimum and maximum values
        //Math.min doesn't work with strings so we need to convert
        let mortality_data = country_data1.map(d => Number(d.mortality))
        let min_mortality = Math.min(...mortality_data)
        let max_mortality = Math.max(...mortality_data)
    
    let regression_data = country_data1.map(d => [stretch0(d.year, 1950, 2017, 0, 1),
            stretch0(d.mortality, min_mortality, max_mortality, 0, 1)])

    //Here is where we train our regressor, experiment with the order value
    let regression_result = regression.polynomial(regression_data, {order: 3});

    //Now we have a trained predictor, lets actually use it!
    let extension_x = [];
    let extension_y = [];
    for(let year = 2017; year < 2030; year++){
        
        //We've still got to work in the normalised scale
        let prediction = regression_result.predict(stretch0(year, 1950, 2017, 0, 1))[1]

        extension_x.push(year);
        //Make sure to un-normalise for displaying on the plot
        extension_y.push(stretch0(prediction, 0, 1, min_mortality, max_mortality));
    }



        //DATA TRACE INTRO
    var data1 = [{
        x: country_data1.map(d => d.year),
        y: country_data1.map(d => d.mortality),
        mode: 'lines',
        name:'Norway',
        type: 'scatter',
        line: {
            color: lineColors.darkblue  
        }},
        //adding our extension as a second trace
        {
            x: extension_x,
            y: extension_y,
            mode: 'lines',
            name: 'Future Norway'
        

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
    Plotly.newPlot('vis1', data1, layout1, config);
}

function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});


}





//VIS 2


function make_plot1(csv_data){
    //Filter our csv data for a particular country
    //Try logging country_data to the console to see what's in it
    var country_data2 = csv_data.filter(d => d.country == "United States");

    //To normalise our data, we need to know the minimum and maximum values
    //Math.min doesn't work with strings so we need to convert
    let mortality_data = country_data2.map(d => Number(d.mortality))
    let min_mortality = Math.min(...mortality_data)
    let max_mortality = Math.max(...mortality_data)

    let regression_data = country_data2.map(d => [stretch1(d.year, 1950, 2017, 0, 1),
        stretch1(d.mortality, min_mortality, max_mortality, 0, 1)])
    
    //Here is where we train our regressor, experiment with the order value
    let regression_result = regression.polynomial(regression_data, {order: 3});
    
    //Now we have a trained predictor, lets actually use it!
    let extension_x = [];
    let extension_y = [];
    for(let year = 2017; year < 2030; year++){
        
        //We've still got to work in the normalised scale
        let prediction = regression_result.predict(stretch0(year, 1950, 2017, 0, 1))[1]

        extension_x.push(year);
        //Make sure to un-normalise for displaying on the plot
        extension_y.push(stretch1(prediction, 0, 1, min_mortality, max_mortality));
    }

    //Setting up graph 2 ft. US Stats, code sourced from Week 8 tutorial and Week 9 tutorial 
    var data2 = [{
        x: country_data2.map(d => d.year),
        y: country_data2.map(d => d.mortality),
        mode: 'lines',
        name:'United States',
        type: 'scatter',
        line: {
            color: lineColors.orange  
        }},
        //adding our extension as a second trace
        {
            x: extension_x,
            y: extension_y,
            mode: 'lines',
            name: 'Future United States',
        

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
    Plotly.newPlot('vis2', data2, layout2, config);
}
function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});


}



//This stretch function is actually just the map function from p5.js
function stretch0(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

//This stretch function is actually just the map function from p5.js
function stretch1(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

//Load the csv data and when loaded: run the make_plot function with that data
Plotly.d3.csv("mortality.csv", make_plot0);

//Load the csv data and when loaded: run the make_plot function with that data
Plotly.d3.csv("mortality.csv", make_plot1);