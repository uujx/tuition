import React, { useState, useEffect } from "react"
import { csv, select } from 'd3'
import draw from "./draw"
import data from '../../data/loan.csv'
import "./Loan.css"

const Loan = () => {

    const [loanState, setLoanState] = useState([])

    useEffect(() => {
        csv(data).then(data => setLoanState(data))
    }, [])

    useEffect(() => {
        select(".loan-plot > *").remove()
        draw(loanState)
    }, [loanState])

    return (
        <div className="section container" data-anchor="fundingPage">
            <div className="loan-plot"></div>
            <div className="loan-text-box">
                <h3>Student Loan</h3>
                <p className="loan-description">
                    Includes the number of Direct Loan borrowers in the
                    specified debt size category. The borrower is the person
                    that holds the federal student loan. In most cases, the
                    borrower is the student, but in parent PLUS loans, the
                    parent is the borrower.Includes the number of Direct Loan borrowers in the
                    specified debt size category. The borrower is the person
                    that holds the federal student loan. In most cases, the
                    borrower is the student, but in parent PLUS loans, the
                    parent is the borrower.
                </p>
            </div>
        </div>
    )
}

export default Loan
