import React from "react";
import Navbar from "./Navbar";
import 'semantic-ui-css/semantic.min.css'

const Layout = (props) => {
    return (
        <main>
            <Navbar />
            {props.children}
        </main>
    )
}

export default Layout;