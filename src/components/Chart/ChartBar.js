import React from 'react';
import './ChartBar.css';

const ChartBar = (props) => {
    console.log("chartbAR")
    console.log(props)
    let barFilledHeight = '0%';

    if(props.maxValue > 0){
        barFilledHeight = Math.round(props.value/props.maxValue *100);
    }
    console.log(props)
    return (
        <div className="chart-bar">
            <div className="chart-bar__inner">
                <div className="chart-bar__fill" style={{height:barFilledHeight,backgroundColor:'blue'}}></div>
            </div>
            <div className="chart-bar__label">{props.label}</div>            
        </div>
    );
}

export default ChartBar;