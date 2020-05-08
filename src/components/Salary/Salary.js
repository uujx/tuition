import React, {useState, useEffect } from "react"
import * as d3 from 'd3'
import draw from './draw'
// import data from '../../data/salary.csv'
import "./Salary.css"

const Salary = (props) => {

    const [salaryState, setSalaryState] = useState([])

    // useEffect(() => {
    //     d3.csv(data).then((data) => {
    //         setSalaryState(data)
    //     })
    // }, [])

    useEffect(() => {
        d3.select(".plot > *").remove()
        draw(salaryState)
    }, [salaryState])

    return (
        <div className="section" data-anchor="salaryPage">
            <div className="slide">
                <h3>How College Pays back</h3>
                <h3>Bar chart or Scatter chart</h3>
            </div>
            <div className="slide">
                <h3>Geo Map in this slide</h3>
            </div>
            <button onClick={() => props.fullpageApi.moveTo(1, 0)}>
                Move top
            </button>
        </div>
    )
}

export default Salary
