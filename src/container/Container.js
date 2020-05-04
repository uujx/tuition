import React from "react"

import HomePage from "../components/HomePage"
import Tuition from "../components/Tuition/Tuition"
import Funding from "../components/Funding"
import Salary from "../components/Salary"

const Container = (props) => {
    return (
        <div id="fullpage-wrapper">
            <HomePage />
            <Tuition />
            <Funding />
            <Salary fullpageApi={props.fullpageApi} />
        </div>
    )
}

export default Container
