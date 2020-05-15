import React, { useState, useEffect, useRef } from "react"
import { csv, select } from "d3"

import draw from "./draw"
// need to import the data in React and then can parse it with d3.csv()
import data from "../../data/tuition.csv"
import "./Tuition.css"

const Tuition = () => {
    const [tuitionState, setTuitionState] = useState([])

    const box = useRef()

    useEffect(() => {
        csv(data).then((data) => {
            setTuitionState(data)
        })
    }, [])

    useEffect(() => {
        select(".tuition-plot > *").remove()
        draw(tuitionState, box.current.offsetWidth, box.current.offsetHeight)
    }, [tuitionState])

    return (
        <div className="section container" data-anchor="tuitionPage">
            <div className="tuition-text-box">
                <h3>Tuition</h3>
                <p className="description">
                    Here we compare the annual income of American families from
                    2000 to 2016 with the average college tuition fees, which
                    includes the average of public college, private college, and
                    all colleges. All numbers are in constant dollar which means
                    they are adjusted for inflation. As it shows on the left,
                    the American household income falls and rises, but the
                    tuition fee has been experiencing a 30% growth throughout
                    these years. For private college, the tuition hits almost
                    half of the median of annual household income.
                </p>
                <p>
                    Data source:
                    https://www.kaggle.com/jessemostipak/college-tuition-diversity-and-pay
                    Created by D3.js
                </p>
            </div>
            <div ref={box} className="tuition-plot"></div>
        </div>
    )
}

export default React.memo(Tuition)
