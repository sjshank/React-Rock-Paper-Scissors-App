import React, { useContext, useRef, useState } from 'react';
import * as AppConstants from '../../config/appConstant';
import Player from '../../components/Player';
import Scoreboard from '../../components/Scoreboard';
import Weapons from '../../components/Weapons';
import { GameContext } from '../../context/gameContext';
import Result from '../../components/Result';
import SwitchButton from '../../UI/Switch';
import Button from '../../UI/Button';
import "./style.css";

/**
    Functional component Game, contains main execution logic
*/
const Game = (props) => {

    //Consume context and utilize current state
    const gameContext = useContext(GameContext);
    const { gameState, onSwitchGameMode, onSwitchPlayerMode, onReset, onSimulateGame, onWeaponSelected } = gameContext;
    //Ref to store time interval object
    const timeInterval = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    /**
     *  Start Game when stimulate mode is selected
     * @param  e, event object to prevent default action
     */
    const startGame = (e) => {
        e.preventDefault();
        onSimulateGame();
        setIsStarted(prevIsStarted => !prevIsStarted);
        timeInterval.current = setInterval(() => {
            onSimulateGame();
        }, 1500);
    }

    /**
     *  Reset Game, Score
     * @param e, event object to prevent default action
     */
    const resetGame = (e) => {
        e.preventDefault();
        clearTimeInterval();
    }

    /**
     *  Switch Player mode from verses to stimulate or vice-verse
     * @param e, event object to prevent default action
     */
    const switchPlayerMode = (e) => {
        clearTimeInterval();
        onSwitchPlayerMode();
    }

    /**
     *  Switch Gaming mode from RPS to RPSLS or vice-versa
     * @param e, event object to prevent default action
     */
    const switchGameMode = (e) => {
        clearTimeInterval();
        onSwitchGameMode();
    }

    /**
     *  Utility to cleartimeout
     */
    const clearTimeInterval = () => {
        setIsStarted(false);
        onReset();
        if (timeInterval && timeInterval.current) {
            clearInterval(timeInterval.current);
        }
    }

    //Populate versesContent based on playermode     
    const versesContent = gameState.playerMode.mode.value === 'verses' && <React.Fragment>
        <Result gameMode={gameState.playerMode.mode.value}
            resultText={gameState.resultText}></Result>

        <section className="margin-small">
            <div className="fluid">
                <Weapons gameState={gameState}
                    onWeaponSelected={onWeaponSelected}></Weapons>
            </div>
        </section>
        <article>
            <Button label={AppConstants.RESET_LABEL}
                onClickMode={resetGame}
                icon="fa fa-refresh"></Button>
        </article>
    </React.Fragment>

    //Populate stimulator based on playermode
    const stimulatorContent = gameState.playerMode.mode.value === 'simulate' && <React.Fragment>
        <Result gameMode={gameState.playerMode.mode.value}
            resultText={gameState.resultText}></Result>

        <section className="margin-small">
            <div className="fluid">
                <Button customClass="" label={gameState.resultText ? AppConstants.RESUME_LABEL : AppConstants.START_LABEL}
                    onClickMode={startGame}
                    disabled={isStarted}
                    icon={!gameState.resultText ? "fa fa-play-circle" : "fa fa-pause-circle"}></Button>
                    &nbsp;&nbsp;
                <Button label={AppConstants.RESET_LABEL}
                    onClickMode={resetGame}
                    icon="fa fa-refresh"></Button>
            </div>
        </section>
    </React.Fragment>

    return (
        <>
            <section >
                <div className="fluid">
                    <div className="row-flex content-at-center">
                        <div className="flex-col">
                            <div className="display-flex content-at-center">
                                <div>
                                    <SwitchButton label="Switch Game"
                                        onChangeMode={switchGameMode}
                                        selectedMode={gameState.gameMode.mode.value === 'rpsls'}></SwitchButton>
                                </div>
                                <div className="paddingLeft-medium">
                                    <SwitchButton label="Switch Mode"
                                        onChangeMode={switchPlayerMode}
                                        selectedMode={gameState.playerMode.mode.value === 'simulate'}></SwitchButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="margin-large">
                        <h5>{gameState.playerMode.mode.label}</h5>
                        <div className="container">
                            <div className="row-flex">
                                <div className="flex-col-short">
                                </div>
                                <div className="flex-col-full">
                                    <Player label={gameState.playerMode.mode.player1Label}
                                        player={gameState.player1}></Player>
                                </div>
                                <div className="flex-col-full">
                                    <Scoreboard gameState={gameState}></Scoreboard>
                                </div>
                                <div className="flex-col-full">
                                    <Player label={gameState.playerMode.mode.player2Label}
                                        player={gameState.player2}></Player>
                                </div>
                                <div className="flex-col-short">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {versesContent}
            {stimulatorContent}
        </>
    );
};

export default Game;