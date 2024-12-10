// File: Sidebar.jsx
import React, { useState } from "react";
import "../Sidebar.css"

const Sidebar = (props) => {
    return (
        <div className="">
            <nav style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', padding: 20, boxShadow: '0 2px 2px 2px rgba(0,0,0,.2)' }}>
                <div style={{ padding: 10}}><a href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700  }}>Maps</a></div>
                <div style={{ padding: 10}}><a href="/chart" style={{ textDecoration: 'none', color: 'white', fontWeight: 700 }}>Chart</a></div>
            </nav>
            <main className="content">
                {props.children}
            </main>
        </div>
    );
};

export default Sidebar;
