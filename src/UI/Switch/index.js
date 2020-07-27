import React from 'react';
import "./style.css";

/**
    Functional component SwitchButton, generic comp to display switch and handle action
*/
const SwitchButton = (props) => {
    return (
        <>
            <label className="switch" aria-label={props.label}>
                <input type="checkbox" onChange={props.onChangeMode} checked={props.selectedMode} />
                <span className="slider round"></span>
            </label>
            <p className="switchBtnLabel">{props.label}</p>
        </>
    );
};

export default React.memo(SwitchButton);