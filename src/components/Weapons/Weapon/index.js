import React from 'react';
import propTypes from 'prop-types';
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

Weapon.propTypes = {
    weapon: propTypes.string.isRequired,
    weaponSelectionHandler: propTypes.func.isRequired
};
export default React.memo(Weapon);