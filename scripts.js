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

const plot1Div = document.getElementById("vis1");
const plot2Div = document.getElementById("vis2");
const plot3Div = document.getElementById("vis3");

Plotly.d3.csv("https://raw.githubusercontent.com/owid/owid-datasets/master/datasets/Child%20mortality%2C%201950-2017%20(IHME%2C%202017)/Child%20mortality%2C%201950-2017%20(IHME%2C%202017).csv", function(rows){

        var trace0 = {
            type: "scatter",
            mode: "lines",
            name: "United States of America",
            x: unpack(rows, "Year"),
            y: unpack(rows, 'Child mortality 1950-2017 (IHME, 2018)'),
            line: {
                color: lineColors.darkblue

            }

        }

        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "Norway",
            x: unpack(rows, "Year"),
            y: unpack(rows, 'Child mortality 1950-2017 (IHME, 2018)'),
            line: {
                color: lineColors.orange

            }

        }
        var data1 = [trace0,trace1];

        var layout1 = {
            title: "Child Mortality in the US versus Norway",
            xaxis: {
                autorange: true,
                rangeselector: {
                    buttons: [{
                        count: 50,
                        label: 'Years', 
                        step: '50y',
                        stepmode: 'forward',

                    },{
                        count: 0,
                        label: 'Child Mortality',
                        step: '20imr',
                        stepmode:'forward',



                    },{
                        step: 'all',
                    }]
                },
                type: 'date',
            }


        }
    Plotly.newPlot (plot1Div, data1, layout1, config);
});

function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});



}
console.log(trace0);
