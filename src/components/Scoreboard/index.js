import React from 'react';
import * as AppConstants from "../../config/appConstant";
import "./style.css";

/**
    Functional component Scoreboard, displays result after each execution
*/
const Scoreboard = (props) => {
    const { gameState } = props;

    return (
        <div className="scoreboard-section" aria-label={AppConstants.SCOREBOARD_LABEL}>
            <div className="scoreboard-body">
                <h6>{AppConstants.SCOREBOARD_LABEL}</h6>
                <div className="scoreboard-box" aria-label="Display Score" >
                    <ul>
                        <li><h6 title="WIN">WIN</h6></li>
                        <li><h6 title="TIES">TIE</h6></li>
                        <li><h6 title="WIN">WIN</h6></li>
                    </ul>
                    <ul>
                        <li><span aria-label="score" className="" title={gameState.player1.score}>{gameState.player1.score}</span></li>
                        <li><span aria-label="score" title={gameState.ties}>{gameState.ties}</span></li>
                        <li><span aria-label="score" title={gameState.player2.score}>{gameState.player2.score}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Scoreboard;