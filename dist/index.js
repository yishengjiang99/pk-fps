import React, { Fragment, useEffect, useState } from 'react';
import { render } from 'react-dom';
function SVGBlock() {
    const [space, setSpace] = useState(1);
    let tref;
    useEffect(() => {
        function loop() {
            const tt = performance.now();
            const fraction = tt - Math.floor(tt);
            setSpace(fraction);
            tref = requestAnimationFrame(loop);
        }
        loop();
        return function c() {
            cancelAnimationFrame(tref);
        };
    }, []);
    return (React.createElement("svg", { style: { display: "block" }, width: "1000", height: "100", viewBox: "0 0 1000 200", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { transform: `translate(${space * 1000}, 0)` },
            React.createElement("path", { d: "M 10 10 H 90 V 90 H 10 L 10 10" }))));
}
const boxes = document.querySelectorAll(".redbox");
for (const box of boxes) {
    let rend = () => {
        const tt = performance.now();
        const frac = tt - Math.floor(tt);
        box.setAttribute("transform", `translate(${frac * 1000},0)`);
        requestAnimationFrame(rend);
    };
    rend();
}
render(React.createElement(Fragment, null,
    React.createElement(SVGBlock, null),
    React.createElement(SVGBlock, null),
    React.createElement(SVGBlock, null),
    React.createElement(SVGBlock, null),
    React.createElement(SVGBlock, null),
    React.createElement(SVGBlock, null)), document.querySelector("#root"));
