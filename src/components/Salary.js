import React from "react"

const Salary = props => {
    return (
        <div className="section" data-anchor="salaryPage">
            <h3>How College Pays back</h3>
            <button onClick={() => props.fullpageApi.moveTo(1, 0)}>Move top</button>
        </div>
    )
}

export default Salary
