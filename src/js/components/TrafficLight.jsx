import React, { useState, useEffect } from 'react';
import '../../styles/trafficLight.css'
//create your first component

const TrafficLight = () => {
    let [lights, setLights] = useState(['red', 'yellow', 'green']);
    let [selected, setSelected] = useState(null);
    let [startCycle, setStartCycle] = useState(false);

    useEffect(() => {
        if (!startCycle) return;
        const cycleOrder = lights.length == 3 ? ['green', 'yellow', 'red'] : ['green', 'yellow', 'red', 'purple'];
        const interval = setInterval(() => {
            setSelected(prev => {
                let index = cycleOrder.indexOf(prev);
                if (index === -1) return cycleOrder[0];
                return cycleOrder[(index + 1) % lights.length];
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [startCycle, lights]);

    let addLight = () => {
        if (!lights.includes('purple')) {
            setLights(prev => [...prev, 'purple']);
        }
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center pt-3">
            <div id="trafficTop" />
            <div id="container" className="d-flex flex-column rounded-4 p-2">
                {lights.map(color => (
                    <div
                        key={color}
                        onClick={() => setSelected(color)}
                        className={`${color} light rounded-circle ${selected === color ? 'selected' : ''}`}
                    />
                ))}
            </div>
            <div className="d-flex pt-5">
                <button onClick={() => setStartCycle(!startCycle)} className="btn btn-dark m-2">{startCycle ? 'Stop' : 'Cycle'}</button>
                <button onClick={() => addLight()} id="purple" className="btn m-2" disabled={lights.includes('purple')}>Purple</button>
            </div>
        </div>
    );
};

export default TrafficLight;