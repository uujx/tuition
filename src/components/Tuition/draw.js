import * as d3 from "d3"

const draw = (data) => {
    // parse the data since the data read from .csv are all strings
    const parseDate = d3.timeParse("%Y")
    data.forEach((d) => {
        d.Year = parseDate(d.Year)
        d.Tuition = +d.Tuition
    })

    const category = [
        "Annual Household Income",
        "Private Institution",
        "All Institution",
        "Public Institution",
    ]

    const margin = {
        top: 100,
        right: 20,
        bottom: 20,
        left: 150,
    }
    const width = 700 + margin.left + margin.right
    const height = 450 + margin.top + margin.bottom
    const pixel_x_range = [margin.left, width - margin.right]
    const pixel_y_range = [height - margin.bottom, margin.top]

    const svg = d3
        .select(".plot")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")

    var color = d3
        .scaleOrdinal()
        .domain(category)
        .range(["#E8C547", "#D72638", "#61E786", "#EF8354"])

    const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.Year))
        .range(pixel_x_range)

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.Tuition) + 10000])
        .range(pixel_y_range)

    /***********************************************************************************/
    /********************************Create Axises**************************************/
    /***********************************************************************************/

    // render axis first before lines so that lines will overlay the horizontal ticks
    const xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(2))
    // horizontal ticks across svg width
    const yAxis = d3
        .axisLeft(y)
        .ticks(10, "s")
        .tickSize(-width + margin.left)

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis)
        .call((g) => {
            g.selectAll("text")
                .style("text-anchor", "middle")
                .attr("y", 15)
                .attr("fill", "#FFF")

            g.selectAll("line").attr("stroke", "#FFF")

            g.select(".domain").attr("stroke", "#FFF")
        })

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis)
        .call((g) => {
            g.selectAll("text")
                .style("text-anchor", "middle")
                .attr("x", -30)
                .attr("fill", "#FFF")

            g.selectAll("line")
                .attr("stroke", "#FFF")
                .attr("stroke-width", 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
                .attr("opacity", 0.4)

            g.select(".domain").remove()
        })
        .append("text")
        .attr("x", 50)
        .attr("y", -10)
        .attr("fill", "#FFF")
        .text("Tuition Constant Dollars")

    /***********************************************************************************/
    /********************************Create legends*************************************/
    /***********************************************************************************/
    var svgLegend = svg
        .append("g")
        .attr("class", "gLegend")
        .attr("transform", "translate(" + (width + 20) + "," + margin.top + ")")

    var legend = svgLegend
        .selectAll(".legend")
        .data(category)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")"
        })

    legend
        .append("circle")
        .attr("class", "legend-node")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 6)
        .style("fill", (d) => color(d))

    legend
        .append("text")
        .attr("class", "legend-text")
        .attr("x", 6 * 2)
        .attr("y", 6 / 2)
        .style("fill", "#FFF")
        .style("font-size", 14)
        .text((d) => d)

    /***********************************************************************************/
    /********************************Paint Lines****************************************/
    /***********************************************************************************/

    // line generator
    const line = d3
        .line()
        .x((d) => x(d.Year))
        .y((d) => y(d.Tuition))

    const nested = d3
        .nest() // necessary to nest data so that keys represent each type
        .key((d) => d.Type)
        .entries(data)

    // APPEND MULTIPLE LINES //
    const lines = svg.append("g").attr("class", "lines")

    const glines = lines
        .selectAll(".line-group")
        .data(nested)
        .enter()
        .append("g")
        .attr("class", "line-group")

    glines
        .append("path")
        .attr("class", "line")
        .attr("d", (d) => line(d.values))
        .style("stroke", (d) => color(d.key))
        .style("fill", "none")
        .style("opacity", 1)
        .style("stroke-width", 4)

    /***********************************************************************************/
    /********************************Add Tooltip Effect*********************************/
    /***********************************************************************************/

    // CREATE HOVER TOOLTIP WITH VERTICAL LINE //
    const tooltip = d3.select(".plot").append("div").attr("class", "tooltip")

    const mouseG = svg.append("g").attr("class", "mouse-over-effects")

    mouseG
        .append("path") // create vertical line to follow mouse
        .attr("class", "mouse-line")
        .style("stroke", "#F2F2F2")
        .style("stroke-width", 1)
        .style("opacity", "0")

    const mousePerLine = mouseG
        .selectAll(".mouse-per-line")
        .data(nested)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line")

    mousePerLine
        .append("circle")
        .attr("r", 4)
        .style("stroke", function (d) {
            return color(d.key)
        })
        .style("fill", (d) => color(d.key))
        .style("stroke-width", 2)
        .style("opacity", "0")

    mouseG
        .append("svg:rect") // append a rect to catch mouse movements on canvas
        .attr("width", 700)
        .attr("height", 450)
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("fill", "none")
        .style("opacity", "0.1")
        .attr("pointer-events", "all")
        .on("mouseout", function () {
            // on mouse out hide line, circles and text
            d3.select(".mouse-line").style("opacity", "0")
            d3.selectAll(".mouse-per-line circle").style("opacity", "0")
            d3.selectAll(".mouse-per-line text").style("opacity", "0")
            d3.selectAll(".tooltip").style("opacity", "0")
        })
        .on("mouseover", function () {
            // on mouse in show line, circles and text
            d3.select(".mouse-line").style("opacity", "0.7")
            d3.selectAll(".mouse-per-line circle").style("opacity", "1")
            d3.selectAll(".tooltip").style("opacity", "0.6")
        })
        .on("mousemove", function () {
            // update tooltip content, line, circles and text when mouse moves
            var mouse = d3.mouse(this)

            d3.selectAll(".mouse-per-line").attr("transform", function (d, i) {
                // use 'invert' to get date corresponding to distance from mouse position relative to svg
                var xDate = x.invert(mouse[0] + margin.left)
                // retrieve row index of date on parsed csv
                var bisect = d3.bisector(function (d) {
                    return d.Year
                }).left
                var idx = bisect(d.values, xDate)

                d3.select(".mouse-line").attr("d", function () {
                    var data =
                        "M" +
                        x(d.values[idx].Year) +
                        "," +
                        (height - margin.bottom)
                    data +=
                        " " + x(d.values[idx].Year) + "," + (margin.top + 20)
                    return data
                })
                return `translate(${x(
                    d.values[idx].Year
                )}, ${y(d.values[idx].Tuition)})`
            })

            updateTooltipContent(mouse, nested)
        })

    function updateTooltipContent(mouse, nested) {
        const sortingObj = []
        nested.forEach((d) => {
            var xDate = x.invert(mouse[0] + margin.left)
            var bisect = d3.bisector(function (d) {
                return d.date
            }).left
            var idx = bisect(d.values, xDate)
            sortingObj.push({
                key: d.values[idx].Type,
                tuition: d.values[idx].Tuition,
                year: d.values[idx].Year.getFullYear(),
            })
        })
        console.log(sortingObj)
        sortingObj.sort(function (x, y) {
            return d3.descending(x.tuition, y.tuition)
        })

        var sortingArr = sortingObj.map((d) => d.key)

        var res_nested1 = nested.slice().sort(function (a, b) {
            return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) 
        })
        
        const year = x.invert(mouse[0] + margin.left).getFullYear() + 1
        tooltip
            .html(year + ":")
            .style("display", "block")
            .style("left", d3.event.pageX + 20 + "px")
            .style("top", d3.event.pageY - 20 + "px")
            .style("font-size", 11.5)
            // list the value for each type
            .selectAll()
            .data(res_nested1)
            .enter()
            .append("div")
            .style("color", (d) => {
                return color(d.key)
            })
            .style("font-size", 10)
            .html((d) => {
                var xDate = x.invert(mouse[0] + margin.left)
                var bisect = d3.bisector(function (d) {
                    return d.Year
                }).left
                var idx = bisect(d.values, xDate)

                return `${d.key}: $<Strong>${d.values[idx].Tuition}</Strong>`
            })
    }

    /***********************************************************************************/
    /********************************Add Description************************************/
    /***********************************************************************************/
    const chartDescription = svg
        .append("g")
        .attr("class", "chart-description")
        .attr("width", 500)
        .attr("height", height)

    // text label for the x axis
    chartDescription
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(${width / 2 + 60}, ${height + 30})`)
        .style("text-anchor", "middle")
        .text("Year")

    // Add plot title
    chartDescription
        .append("text")
        .attr("class", "plot-title")
        .text("Tuition Trend by Year")
        .attr("transform", `translate(${width / 2 + 50}, 50)`)
        .style("text-anchor", "middle")
}

export default draw

// // Add the line for household income
// lineChart.append("path")
//     .datum(data.filter((d) => d.Type === "Annual Household Income"))
//     .attr("fill", "none")
//     .attr("stroke", "#E8C547")
//     .attr("stroke-width", 3)
//     .attr(
//         "d",
//         d3
//             .line()
//             .x(function (d) {
//                 return x(d.Year)
//             })
//             .y(function (d) {
//                 return y(d.Tuition)
//             })
//     )

// // Add the line for private institution
// lineChart.append("path")
//     .datum(data.filter((d) => d.Type === "Private Institution"))
//     .attr("fill", "none")
//     .attr("stroke", "#D72638")
//     .attr("stroke-width", 3)
//     .attr(
//         "d",
//         d3
//             .line()
//             .x(function (d) {
//                 return x(d.Year)
//             })
//             .y(function (d) {
//                 return y(d.Tuition)
//             })
//     )

// // Add the line for all institution
// lineChart.append("path")
//     .datum(data.filter((d) => d.Type === "All Institution"))
//     .attr("fill", "none")
//     .attr("stroke", "#61E786")
//     .attr("stroke-width", 3)
//     .attr(
//         "d",
//         d3
//             .line()
//             .x(function (d) {
//                 return x(d.Year)
//             })
//             .y(function (d) {
//                 return y(d.Tuition)
//             })
//     )

// // Add the line for public institution
// lineChart.append("path")
//     .datum(data.filter((d) => d.Type === "Public Institution"))
//     .attr("fill", "none")
//     .attr("stroke", "#EF8354")
//     .attr("stroke-width", 3)
//     .attr(
//         "d",
//         d3
//             .line()
//             .x(function (d) {
//                 return x(d.Year)
//             })
//             .y(function (d) {
//                 return y(d.Tuition)
//             })
//     )
