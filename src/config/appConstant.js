/***
 * 
 *  Application Constants
 * 
 */


//RPS weapons
export const RPS_APP_CONSTANT = ['rock', 'paper', 'scissors'];
//RPSLS weapons
export const RPSLS_APP_CONSTANT = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

//Gaming modes - rock,paper,scissors and rock,paper,scissors,lizard,spock
export const GAME_MODES = {
    rps: {
        label: RPS_APP_CONSTANT.join(', ').toUpperCase(),
        value: 'rps'
    },
    rpsls: {
        label: RPSLS_APP_CONSTANT.join(', ').toUpperCase(),
        value: 'rpsls'
    }
}

//Different Player modes - verses and stimulate
export const PLAYER_MODES = {
    verses: {
        label: 'PLAYER VS COMPUTER',
        player1Label: 'PLAYER',
        player2Label: 'COMPUTER',
        value: 'verses'
    },
    simulate: {
        label: 'COMPUTER VS COMPUTER',
        player1Label: 'COMPUTER 1',
        player2Label: 'COMPUTER 2',
        value: 'simulate'
    }
}

//RPS rules
export const RPS_WEAPONS = {
    rock: ['scissors'],
    paper: ['rock'],
    scissors: ['paper']
};

//RPSLS rules
export const RPSLS_WEAPONS = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'Spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['scissors', 'rock']
};

//Reset button
export const RESET_LABEL = "RESET";
//Start button
export const START_LABEL = "START GAME";
//Resume button
export const RESUME_LABEL = "RESUME GAME";
//Scoreboard header
export const SCOREBOARD_LABEL = "SCOREBOARD";
//Information
export const INFO_LABEL = "Choose your weapon below to captivate Computer!";