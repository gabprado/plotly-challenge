function buildGauge(sample) {
    let level = sample;
    let degrees = 180 - ((level * 20)),
        radius = .8;
    let radians = degrees * Math.PI / 180;
    let aX = 0.025 * Math.cos((degrees - 90) * Math.PI / 180);
    let aY = 0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    let bX = -.025 * Math.cos((degrees - 90) * Math.PI / 180);
    let bY = -0.025 * Math.sin((degrees - 90) * Math.PI / 180);
    let cX = radius * Math.cos(radians);
    let cY = radius * Math.sin(radians);
    let path = `M ${aX} ${aY} L ${bX} ${bY} L ${cX} ${cY} Z`;
    let data = [{
            type: "scatter",
            x: [0],
            y: [0],
            marker: {
                size: 28,
                color: "850000",
            },
            showlegend: false,
            text: level,
            name: "speed",
            hoverinfo: ("text+name")
        },
        {
            values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: ["#0284A1", "#0297B8", "#22A4C1", "#41B1CA", "#61BED3", "#81CBDB", "#A0D8E4", "#C0E5ED", "#DFF2F6", "#494949"]
            },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: .5,
            type: "pie",
            showlegend: false
        }
    ];
    let layout = {
        height: 400,
        width: 400,
        shapes: [{
            type: "path",
            path: path,
            fillcolor: "850000",
            line: {
                color: "850000"
            }
        }],
        title: "Belly Button Washing Frequency<br>Scrubs Per Week",
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            fixedrange: true,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            fixedrange: true,
            range: [-1, 1]
        }
    };
    Plotly.newPlot("gauge", data, layout);
}