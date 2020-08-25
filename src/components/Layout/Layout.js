import React from 'react';

import "./Layout.scss";

function Layout({ children }) {

    return (
        <div className="Layout">
            { children }
        </div>
    )
}

export default Layout;
