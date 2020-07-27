import React from 'react';
import "./style.css";

/**
    Functional component Weapon, render each Weapon and handle fire click action
*/
const Weapon = (props) => {
    const { weapon, weaponSelectionHandler } = props;
    return (
        <div className="weapon-section">
            <div className="weapon-box" onClick={(e) => weaponSelectionHandler(weapon, e)}>
                <i className={`fa fa-hand-${weapon}-o fa-2x`} aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default React.memo(Weapon);