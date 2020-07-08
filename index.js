const { select, scaleOrdinal, pie, entries, arc } = d3;
const height = document.body.clientHeight;
const width = document.body.clientWidth;


const render = data => {
console.log("data", data)
    
// The radius of the pie is the smaller of half the width or height.
    const radius = Math.min(width, height) / 2 - 30;
    
    // append the svg object
    const svg = select("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    const color = scaleOrdinal()
        .domain(data)
        .range(["#E3BA22", "#E6842A", "#137B80", "#8E6C8A", "#BD2D28", "#5C8100", "#A0B700", "#ffbcb0", "#978F80"]);

    // Compute the position of each group on the pie:
    const pieChart = pie()
        .value(d => d.value.length);
    
    const data_ready = pieChart(entries(data));

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('path')
        .data(data_ready)
        .enter()
            .append('path')
                .attr('d', arc()
                    .innerRadius(radius/1.2)         // This is the size of the donut hole
                    .outerRadius(radius)
                )
                .attr('id',d => d.data.key)
                .attr('class','segment')
                .attr('fill', d => (color(d.data.key)))
                .attr("stroke", "black")
                .style("stroke-width", "3")
                .append('title')
                  .text(d => d.data.key)

            svg.selectAll('text')
                .data(data_ready)
                .enter()
                    .append('text')
                        .attr('id','name')
                        .attr('class','emotion')
    
            svg.select('text')
                .data(data_ready)
                .enter()
                    .append('text')
                        .attr('id','percentage')
                        .attr('class','percentage')
}

function createSet () {
    const dataObj = {anger: [], anticipation:[], disgust: [], fear:[], joy:[], sadness: [], surprise: [], trust: [], other: []};
    fetch('https://spectrum-bloom-apatosaurus.glitch.me')
    .then(response => response.json())
    .then(data => {
        data.forEach(emotion => {
            if (dataObj[emotion[1]]){
                dataObj[emotion[1]].push(emotion[0][0]);
            } else {
                dataObj.other.push(emotion[0][0]);
            }
        })
        render(dataObj);

        const segments = document.querySelectorAll('.segment');
        const emotion = document.getElementById('name');
        const percentage = document.getElementById('percentage');
        const totalLength = data.length;
        console.log("createSet -> totalLength", dataObj)

        segments.forEach(segment => {
            segment.addEventListener('mouseover', event => {
                emotion.textContent = event.target.id;
                percentage.textContent = Number.parseFloat(dataObj[event.target.id].length*100/totalLength).toPrecision(3) + "%";
            });
        });
    });
}

createSet();
