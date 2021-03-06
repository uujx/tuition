import * as d3 from "d3"

const draw = (data, boxWidth, boxHeight) => {
    // format data
    data.forEach((d) => {
        d.Borrowers = +d.Borrowers
    })

    const margin = {
        top: 150,
        right: 20,
        bottom: 20,
        left: 50,
    }
    const width = boxWidth * 0.8 + margin.left + margin.right
    const height = boxHeight * 0.65 + margin.top + margin.bottom
    const pixel_x_range = [margin.left, width - margin.right]
    const pixel_y_range = [height - margin.bottom, margin.top]

    const svg = d3
        .select(".loan-plot")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")

    // Define the div for the tooltip
    const div = d3
        .select(".loan-plot")
        .append("div")
        .attr("class", "loan-tooltip")
        .style("opacity", 0)

    const color = d3.scaleOrdinal(d3.schemeSet3)

    const max_data = d3.max(data, (d) => d.Borrowers)

    const x = d3
        .scaleBand()
        .domain(data.map((d) => d.Loan)) //categorical values
        .range(pixel_x_range)
        .padding(0.3)

    const y = d3.scaleLinear().domain([0, max_data]).range(pixel_y_range)

    // Add the X Axis
    // Render axis first before lines so that lines will overlay the horizontal ticks
    const xAxis = d3.axisBottom(x)
    const yAxis = d3
        .axisLeft(y)
        .ticks(8, "s")
        .tickFormat((d) => d + "M")
        .tickSize(-width + margin.left + margin.right)

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis)
        .call((g) => {
            g.selectAll("text")
                .style("text-anchor", "middle")
                .attr("y", 15)
                .attr("fill", "#FFF")
        })

    // Add the Y Axis
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
                // make horizontal tick thinner and lighter so that line paths can stand out
                .attr("stroke-width", 0.7)
                .attr("opacity", 0.4)

            g.select(".domain").remove()
        })

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).tickFormat(""))
        .attr("transform", `translate(${margin.left - 5}, 0)`)

    // Add the bars
    const g = svg
        .append("g")
        .attr("class", "bar")
        .attr("height", height)
        .attr("width", width)
        .attr("transfrom", `translate(${margin.left}, ${margin.top})`)

    const groups = g
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.Loan))
        .attr("y", (d) => y(d.Borrowers))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d.Borrowers))
        .attr("fill", (d) => color(d.Loan))
        // set tooltip
        .on("mouseover", function (d) {
            this.style.opacity = 0.9
            div.transition().duration(200).style("opacity", 0.9)
            div.html(`Borrowers: ${d.Borrowers}M`)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY - 20 + "px")
        })
        .on("mouseout", function (d) {
            this.style.opacity = 1
            div.transition().duration(400).style("opacity", 0)
        })

    // text label for the x axis
    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", `translate(${width / 2}, ${height + 30})`)
        .style("text-anchor", "middle")
        .text("The Total Balance of a Borrower's Direct Loans")
        .attr("font-size", "1vw")
        // .attr("font-weight", 800)
        .attr("fill", "white")

    // text label for the y axis
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "start")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", `translate(0, ${margin.top - 35})`)
        .attr("fill", "white")
        .text("Borrowers")

    // Add plot title
    g.append("text")
        .attr("class", "plot-title")
        .text("Number of Direct Loan Borrowers by Debt Size")
        .attr("transform", `translate(${width / 2 + 30}, 100)`)
        .style("text-anchor", "middle")
}

export default draw
