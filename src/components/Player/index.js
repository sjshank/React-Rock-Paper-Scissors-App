import React from 'react';
import "./style.css";

/**
    Functional component Player, displays weapon selected by player/computer
*/
const Player = (props) => {
    const { label, player } = props;

    return (
        <div className="player-box" aria-label={label}>
            <div className="player-box-body">
                <h6 title={label}>{label}</h6>
                <div title={player.weapon ? player.weapon : ''} aria-label="weapon">
                    {player.weapon && <i className={`fa fa-hand-${player.weapon}-o fa-4x`} aria-hidden="true"></i>}
                    {!player.weapon && <i className="fa fa-question fa-3x marginTop-small" aria-hidden="true"></i>}
                </div>
            </div>
        </div>
    )
};

export default Player;