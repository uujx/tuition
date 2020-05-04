import React from "react"
import "./Menu.css"

const Menu = () => {
    return (
        <div>
            <nav className="menu">
                <ul className="actions">
                    <li data-menuanchor="homePage" className="active">
                        <a href="#homePage">Home Page</a>
                    </li>
                    <li data-menuanchor="tuitionPage">
                        <a href="#tuitionPage">Tuition section</a>
                    </li>
                    <li data-menuanchor="fundingPage">
                        <a href="#fundingPage">Funding section</a>
                    </li>
                    <li data-menuanchor="salaryPage">
                        <a href="#salaryPage">Salary section</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu
