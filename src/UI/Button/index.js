import React from 'react';
import "./style.css";

/**
    Functional component Button, generic comp to display button and handle action
*/
const Button = (props) => {
    return (
        <button className="button margin-small" onClick={props.onClickMode}
            disabled={props.disabled}>
            <i className={props.icon} aria-hidden="true"></i>
            <span className="paddingLeft-x_small">{props.label}</span>
        </button>
    );
};

export default React.memo(Button);