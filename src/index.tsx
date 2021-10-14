import React, { Fragment, useEffect, useState } from 'react'
import { render } from 'react-dom'


function SVGBlock() {
	const [space, setSpace] = useState(1);
	let tref: number
	useEffect(() => {
		function loop() {
			const tt = performance.now();
			const fraction = tt - Math.floor(tt);
			setSpace(fraction)
			tref = requestAnimationFrame(loop);
		}
		loop();
		return function c() {
			cancelAnimationFrame(tref)
		}
	}, []);

	return (<svg style={{ display: "block" }}
		width="1000" height="100" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg">
		<g transform={`translate(${space * 1000}, 0)`}>
			<path
				d="M 10 10 H 90 V 90 H 10 L 10 10" />
		</g>
	</svg>)
}

const boxes = document.querySelectorAll(".redbox")!;

for (const box of boxes)
{
	let rend = () => {
		const tt = performance.now();
		const frac = tt - Math.floor(tt);
		box.setAttribute("transform", `translate(${frac * 1000},0)`);
		requestAnimationFrame(rend);
	}
	rend();
}
render(<Fragment><SVGBlock /><SVGBlock /><SVGBlock /><SVGBlock /><SVGBlock /><SVGBlock /></Fragment>, document.querySelector("#root"));
