/****
 * 
 *  ROCK PAPER SCISSORS LIZARD SPOCK Game
 * 
 *  @AUthor Saurabh Shankariya <sjshankariya@gmail.com>
 */
import React from 'react';
import Headline from './components/HeadLine';
import Game from './containers/Game';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';


const App = () => {
  return (
    <div className="app">
      {/* Header Section **/}
      <header>
        <Headline></Headline>
      </header>
      {/* Main Section **/}
      <main className="marginTop-large">
        <Game></Game>
      </main>
    </div >
  );
}

export default App;
