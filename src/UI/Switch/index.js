import React from 'react';
import propTypes from 'prop-types';
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

SwitchButton.propTypes = {
    label: propTypes.string.isRequired,
    onChangeMode: propTypes.func.isRequired
};
export default React.memo(SwitchButton);