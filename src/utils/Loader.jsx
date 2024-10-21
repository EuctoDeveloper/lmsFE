import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Loader = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1000 }}>
            <div style={{ fontSize: 24 }}>
                <Spin />
            </div>
        </div>
    );
};

let loaderRoot = document.createElement('div');
loaderRoot.id = 'loader-root';
document.body.appendChild(loaderRoot);

export const openLoader = () => {
    ReactDOM.render(<Loader />, loaderRoot);
};

export const closeLoader = () => {
    ReactDOM.unmountComponentAtNode(loaderRoot);
};

export default Loader;