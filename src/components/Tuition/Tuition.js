import React, { useEffect } from "react"
import "./Tuition.css"
import d3 from 'd3'
import draw from './draw'

const Tuition = props => {
    useEffect(() => {
        d3.select('.viz > *').remove();
        draw(props)
    }, [props])

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



export default Tuition
