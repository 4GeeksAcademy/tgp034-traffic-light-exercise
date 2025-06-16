import React, { useState, useEffect } from 'react';
import '../../styles/trafficLight.css'
//create your first component

const TrafficLight = () => {
    let[selected, setSelected] = useState(null);
    let[startCycle, setStartCycle] = useState(false);
    useEffect(() => {
        if(!startCycle) return;
        const interval = setInterval(() => {
            if(selected === 'green') setSelected('yellow');
            else if(selected === null || selected === 'red') setSelected('green');
            else if(selected === 'yellow') setSelected('red');
            else if(selected === 'purple') setSelected('red');
        }, 1000);
        return () => clearInterval(interval);
    }, [selected,startCycle]);

    let addLight = () =>{
        let div = document.createElement('div');
        div.className = `purple light rounded-circle`;
        document.getElementById("container").appendChild(div);
    }
	return (
		<div className="d-flex flex-column justify-content-center align-items-center pt-3">
            <div id="trafficTop"/>
            <div id="container" className="d-flex flex-column rounded-4 p-2">
                <div onClick={() => setSelected('red')} className={`red light rounded-circle ${selected === 'red' ? 'selected' : ''}`}></div>
                <div onClick={() => setSelected('yellow')} className={`yellow light rounded-circle ${selected === 'yellow' ? 'selected' : ''}`}></div>
                <div onClick={() => setSelected('green')} className={`green light rounded-circle ${selected === 'green' ? 'selected' : ''}`}></div>
            </div>
            <div className="d-flex pt-5">
                <button onClick={() =>setStartCycle(!startCycle)} className="btn btn-dark m-2">Cycle</button>
                <button onClick={() => addLight()} id="purple" className="btn m-2">Purple</button>
            </div>
		</div>
	);
};

export default TrafficLight;