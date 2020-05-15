import React, { useState, useEffect, useRef } from "react"
import { csv, select } from "d3"
import draw from "./draw"
import data from "../../data/loan.csv"
import "./Loan.css"

const Loan = () => {
    const [loanState, setLoanState] = useState([])

    const box = useRef()

    useEffect(() => {
        csv(data).then((data) => setLoanState(data))
    }, [])

    useEffect(() => {
        select(".loan-plot > *").remove()
        draw(loanState, box.current.offsetWidth, box.current.offsetHeight)
    }, [loanState])

    return (
        <div className="section container" data-anchor="fundingPage">
            <div ref={box} className="loan-plot"></div>
            <div className="loan-text-box">
                <h3>Student Loan</h3>
                <p className="description">
                    The chart shows the number of Direct Loan borrowers in 2020
                    in the specified debt size category. The borrower is the
                    person that holds the Federal Student Loan, which could be
                    the student or their parents. The total number of Direct
                    Loan borrowers are around 37.5 millions. More than 10
                    million of them still have more than $40k loans to repay.
                    The amount of loans varies from each student, but it could
                    goes up to more than 200k.
                </p>
                <p>
                    Data source:
                    https://studentaid.gov/data-center/student/portfolio Created
                    by D3.js
                </p>
            </div>
        </div>
    )
}

export default Loan
