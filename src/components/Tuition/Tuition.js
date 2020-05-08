import React, { useState, useEffect } from "react"
import { csv, select } from "d3"

import draw from "./draw"
// need to import the data in React and then can parse it with d3.csv()
import data from "../../data/tuition.csv"
import "./Tuition.css"

const Tuition = () => {
    const [tuitionState, setTuitionState] = useState([])

    useEffect(() => {
        csv(data).then((data) => {
            setTuitionState(data)
        })
    }, [])

    useEffect(() => {
        select(".tuition-plot > *").remove()
        draw(tuitionState)
    }, [tuitionState])

    return (
        <div className="section container" data-anchor="tuitionPage">
            <div className="tuition-text-box">
                <h3>Tuition</h3>
                <p className="tuition-description">
                    Data description: the tuition fee increase a lot throughout the years.
                    For private colledge, the tuition is almost half amount of the median of 
                    annual household income. 
                    Data source: ...
                    Created by D3.js
                </p>
            </div>
            <div className="tuition-plot"></div>
        </div>
    )
}

export default React.memo(Tuition)
