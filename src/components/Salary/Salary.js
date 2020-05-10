import React, { useState, useEffect } from "react"
import { csv } from "d3"
import { Line } from "react-chartjs-2"
import rawData from "../../data/salary.csv"
import "./Salary.css"

const Salary = (props) => {
    const [salaryState, setSalaryState] = useState({})

    var chartColors = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(87, 167, 115)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        grey: "rgb(231, 233, 237)",
        gridLine: "rgba(134, 135, 132, 0.2)",
    }

    // Set options for chart.js
    const options = {
        responsive: true,
        title: {
            display: true,
            text: "Mid Career Salary by Major",
            fontColor: "white",
            fontSize: 20,
        },
        legend: {
            labels: {
                fontSize: 14,
                fontColor: "white",
            },
        },
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Undergraduate Major",
                        fontSize: 18,
                        fontColor: "white",
                    },
                    ticks: {
                        fontColor: "#E6E6E6",
                        fontSize: 14,
                        padding: 14,
                    },
                    gridLines: {
                        color: chartColors.gridLine,
                    },
                },
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Salary",
                        fontColor: "white",
                        fontSize: 18,
                    },
                    ticks: {
                        callback: function (label, index, labels) {
                            return label / 1000 + "k"
                        },
                        fontColor: "#E6E6E6",
                        fontSize: 14,
                        padding: 14,
                    },
                    gridLines: {
                        color: chartColors.gridLine,
                    },
                },
            ],
        },
    }

    useEffect(() => {
        csv(rawData).then((res) => {
            // Sort the data based on the average value
            res.sort((a, b) => {
                const aAvg =
                    (a["Mid-Career 10th Percentile Salary"] +
                        a["Mid-Career 25th Percentile Salary"] +
                        a["Mid-Career 75th Percentile Salary"] +
                        a["Mid-Career 90th Percentile Salary"] +
                        a["Mid-Career Median Salary"]) /
                    5

                const bAvg =
                    (b["Mid-Career 10th Percentile Salary"] +
                        b["Mid-Career 25th Percentile Salary"] +
                        b["Mid-Career 75th Percentile Salary"] +
                        b["Mid-Career 90th Percentile Salary"] +
                        b["Mid-Career Median Salary"]) /
                    5

                return aAvg - bAvg
            })

            const labels = res.map((d) => d["Undergraduate Major"]),
                salary10 = res.map(
                    (d) => d["Mid-Career 10th Percentile Salary"]
                ),
                salary25 = res.map(
                    (d) => d["Mid-Career 25th Percentile Salary"]
                ),
                salary75 = res.map(
                    (d) => d["Mid-Career 75th Percentile Salary"]
                ),
                salary90 = res.map(
                    (d) => d["Mid-Career 90th Percentile Salary"]
                ),
                salaryMedian = res.map((d) => d["Mid-Career Median Salary"])

            setSalaryState({
                labels: labels,

                datasets: [
                    {
                        label: "Mid-Career 10th Percentile Salary",
                        data: salary10,
                        fill: false,
                        showLine: false,
                        pointRadius: 4,
                        borderColor: chartColors.green,
                        backgroundColor: chartColors.green,
                    },
                    {
                        label: "Mid-Career 25th Percentile Salary",
                        data: salary25,
                        fill: false,
                        showLine: false,
                        pointRadius: 4,
                        borderColor: chartColors.grey,
                        backgroundColor: chartColors.grey,
                    },
                    {
                        label: "Mid-Career Median Salary",
                        data: salaryMedian,
                        fill: false,
                        showLine: false,
                        pointRadius: 4,
                        borderColor: chartColors.red,
                        backgroundColor: chartColors.red,
                    },
                    {
                        label: "Mid-Career 75th Percentile Salary",
                        data: salary75,
                        fill: false,
                        showLine: false,
                        pointRadius: 4,
                        borderColor: chartColors.orange,
                        backgroundColor: chartColors.orange,
                    },
                    {
                        label: "Mid-Career 90th Percentile Salary",
                        data: salary90,
                        fill: false,
                        showLine: false,
                        pointRadius: 4,
                        borderColor: chartColors.blue,
                        backgroundColor: chartColors.blue,
                    },
                ],
            })
        })
    }, [chartColors])

    return (
        <div className="section" data-anchor="salaryPage">
            <div className="slide">
                <div className="salary-text-box">
                    <h3>How College Pays back</h3>
                    <p className="description">
                        Detailed description.Detailed description.Detailed
                        description.Detailed description.Detailed
                        description.Detailed description.Detailed
                        description.Detailed description.Detailed
                        description.Detailed description.Detailed
                        description.Detailed description.Detailed description.
                    </p>
                </div>
            </div>
            <div className="slide">
                <div className="salary-plot">
                    <Line data={salaryState} options={options} />
                </div>
            </div>
            <button onClick={() => props.fullpageApi.moveTo(1, 0)}>
                Move top
            </button>
        </div>
    )
}

export default Salary
