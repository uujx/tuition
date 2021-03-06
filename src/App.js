import React from "react"
import ReactFullpage from "@fullpage/react-fullpage"

import Menu from "./components/Menu/Menu"
import Container from "./container/Container"
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
                    "loanPage",
                    "salaryPage",
                ]}
                menu=".menu"
                // navigation={true}
                scrollOverflow={true}
                sectionsColor={["#FF5F45", "#141B41", "#AD3B44", "#001A23"]}
                onLeave={onLeave.bind(this)}
                afterLoad={afterLoad.bind(this)}
                render={({ state, fullpageApi }) => (
                    <Container state={state} fullpageApi={fullpageApi} />
                )}
            />
        </React.Fragment>
    )
}

export default App
