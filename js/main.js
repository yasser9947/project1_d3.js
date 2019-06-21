/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
console.log("err")
var margin = { left: 40, right: 20, top: 10, bottom: 30 };
var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var flag = true ;
// transition
var t = d3.transition().duration(750);

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left
        + ", " + margin.top + ")");

g.append("text")
    .attr('class', "x axis-label")
    .attr('x', width / 2)
    .attr('y', height + 100)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("yasser made this D3 ")

var yLebale = g.append("text")
    .attr('class', "y axis-label")
    .attr('y', -20)
    .attr('x', -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("revenue ")
var data = [
    {
        "month": "January",
        "revenue": "13432",
        "profit": "8342"
    },
    {
        "month": "February",
        "revenue": "19342",
        "profit": "10342"
    },
    {
        "month": "March",
        "revenue": "17443",
        "profit": "15423"
    },
    {
        "month": "April",
        "revenue": "26342",
        "profit": "18432"
    },
    {
        "month": "May",
        "revenue": "34213",
        "profit": "29434"
    },
    {
        "month": "June",
        "revenue": "50321",
        "profit": "45343"
    },
    {
        "month": "July",
        "revenue": "54273",
        "profit": "47452"
    }
]
console.log(data)
data.forEach(ele => {
    ele.profit = +ele.profit
    ele.revenue = +ele.revenue
});
var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([height, 0])

var xG = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0 , " + height + ")")

var yG = g.append("g")
    .attr("class", "y-axis")

d3.interval(function () {
    //your cod here 
    flag = !flag
    console.log(flag)
    update(data)
    
} , 2000)

// ====================
function update(data) {
    var vale = flag ? "revenue" : "profit";
    x.domain(data.map(function (d) {
        return d.month
    }))
    y.domain([0, d3.max(data, function (d) {
        return d[vale]
    })])


    var bottomAxis = d3.axisBottom(x)
    xG.transition(t)
    .call(bottomAxis).selectAll("text")
        .attr('y', `10`)
        .attr('x', `-5`)
        .attr('text-anchor', `start`)




    var leftAxis = d3.axisLeft(y)
    yG.transition(t)
    .call(leftAxis);



    var rects = g.selectAll('rect')
        .data(data)
    // exit old ele not present 
    rects.exit()
    .attr("fill" , "red")
    .transition(t)
    .attr("y" , 0)
    .attr("height" ,0)
    .remove();
    // update old ele present in new one 
    rects.transition(t)
        .attr("x", function (d) {
            return x(d.month)
        })
        .attr("y", function (d) {
            return y(d[vale])
        })
        .attr("width", x.bandwidth)
        .attr("height", function (d) {
            return height - y(d[vale])
        })
        .attr("fill", function (d) {
            return "grey"
        })

// enter new ele present in new date 

rects.enter()
    .append("rect")
    .attr("x", function (d) {
        return x(d.month)
    })
    .attr("y", function (d) {
        return y(d[vale])
    })

    .attr("width", x.bandwidth)
   
    .attr("fill", function (d) {
        return "grey"
    })
    .attr("y" , 0)
    .attr("height" ,0)
    .transition(t)
    .attr("height", function (d) {
        return height - y(d[vale])
    })
    yLebale.text(vale)
}
