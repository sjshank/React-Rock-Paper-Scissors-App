import React, { useContext } from 'react';
import { GameContext } from '../../context/gameContext';
import "./style.css";

/**
    Functional component Headline, displays application header
*/
const Headline = (props) => {
    //consume context
    const gameContext = useContext(GameContext);
    const { gameState } = gameContext;

    return (
        <>
            <div className="fluid header-section">
                <div className="row-flex">
                    <div className="flex-col">
                        <div className="">
                            <h1 className="header-label">
                                {gameState.gameMode.mode.label}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="headline-hr" />
        </>
    )
}

export default React.memo(Headline);