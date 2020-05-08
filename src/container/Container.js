import React from "react"

import HomePage from "../components/HomePage/HomePage"
import Tuition from "../components/Tuition/Tuition"
import Loan from "../components/Loan/Loan"
import Salary from "../components/Salary/Salary"

const Container = (props) => {
    return (
        <div id="fullpage-wrapper">
            <HomePage />
            <Tuition />
            <Loan />
            <Salary fullpageApi={props.fullpageApi} />
        </div>
    )
}

export default Container
