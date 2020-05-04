import React, { useState, useEffect } from "react"
import * as d3 from 'd3'

import draw from './draw'
// need to import the data in React and then can parse it with d3.csv()
import data from '../../data/tuition.csv'
import "./Tuition.css"

const Tuition = props => {

    const [tuitionState, setTuitionState] = useState([])

    useEffect(() => {
        d3.csv(data).then(data => {
            setTuitionState(data)
        })
    }, [])

    useEffect(() => {
        d3.select('.plot > *').remove();
        draw(tuitionState)
    }, [tuitionState])

    return (
        <div className="section" data-anchor="tuitionPage">
            <div className="container">
                <div className="text-box">
                    <h3>Tuition</h3>
                    <p className="description">
                        Detailed description goes here.Detailed description goes
                        here.Detailed description goes here.Detailed description
                        goes here.Detailed description goes here.Detailed
                        description goes here.Detailed description goes
                        here.Detailed description goes here.Detailed description
                        goes here.Detailed description goes here.Detailed
                        description goes here.
                    </p>
                </div>
                <div className="plot"></div>
            </div>
        </div>
    )
}

export default React.memo(Tuition)
