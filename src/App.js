import React from "react"
import ReactFullpage from "@fullpage/react-fullpage"

import Menu from "./components/Menu/Menu"
import HomePage from "./components/HomePage"
import Tuition from "./components/Tuition/Tuition"
import Funding from "./components/Funding"
import Salary from "./components/Salary"

import "./App.css"

function App() {
    const onLeave = (origin, destination, direction) => {
        console.log("Leaving section " + origin.index)
    }
    const afterLoad = (origin, destination, direction) => {
        console.log("After load: " + destination.index)
    }

    return (
        <React.Fragment>
            <Menu />
            <ReactFullpage
                anchors={[
                    "homePage",
                    "tuitionPage",
                    "fundingPage",
                    "salaryPage",
                ]}
                menu=".menu"
                navigation={true}
                scrollOverflow={true}
                sectionsColor={["#FF5F45", "#0798EC", "#FC6C7C", "#FEC401"]}
                onLeave={onLeave.bind(this)}
                afterLoad={afterLoad.bind(this)}
                render={({ state, fullpageApi }) => {
                    return (
                        <div id="fullpage-wrapper">
                            <HomePage />
                            <Tuition />
                            <Funding />
                            <Salary fullpageApi={fullpageApi} />
                        </div>
                    )
                }}
            />
        </React.Fragment>
    )
}

export default App
