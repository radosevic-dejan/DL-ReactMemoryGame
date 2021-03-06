import React, { Component } from 'react';
import GameContainer from './components/GameContainer';
import ControlPanel from './components/ControlPanel';

const imgID = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

class App extends Component {
  state = {
    imgNum: shuffle(imgID),
    flipedCard: false,
    firstCard: null,
    secondCard: null,
    lockUntilFlip: false,
    lockFlip: false,
    playerMoves: 5,
    points: 0,
    message: '',
    endGame: false
  };

  handleReset = (e) => {
    const targetElements = e.target.parentElement.parentElement
    const cardHolders = Array.from(targetElements.children[1].children).filter(e => e.classList.contains('flip'))
    cardHolders.forEach(e => e.classList.remove('flip'))
    this.setState({
      imgNum: shuffle(imgID),
      flipedCard: false,
      firstCard: null,
      secondCard: null,
      lockUntilFlip: false,
      lockFlip: false,
      playerMoves: 5,
      points: 0,
      message: '',
      endGame: false
    });
  };


  cardFlip = async (e) => {
    let flipedCard = this.state.flipedCard;
    let lockUntilFlip = this.state.lockUntilFlip;
    let firstCard = this.state.firstCard;
    let targetName = e.target.parentNode;

    if (lockUntilFlip) return;
    if (targetName === firstCard) return;
    targetName.classList.toggle('flip');

    console.log(this)

    if(this.state.points === 6){
      
      return(
        await this.setState({ message: "won", endGame: true})
      )
    }

    if(this.state.playerMoves === 0){
      return(
        await this.setState({ message: "lose", endGame: true })
      )
    }

    if (!flipedCard) {
      // Igrač prvi put klikce na kartu
      // Setuje se u state da je flip registrovan na true
      this.setState({
        flipedCard: true,
        firstCard: targetName,
      });
      return;
    } else {
      // Ako je igrač već kliknuo
      //! OVAJ AWAIT MORA
      await this.setState({ flipedCard: false, secondCard: targetName });
    }

    // Provjera podudarnosti dvije kliknute karte
    this.checkMatch();
  };

  checkMatch = () => {
    const firstCard = this.state.firstCard;
    const secondCard = this.state.secondCard;
    const points = this.state.points;
    const moves = this.state.playerMoves;
    
    if (firstCard.dataset.name === secondCard.dataset.name) {
      // console.log(this.state.lockFlip)
      this.setState({ points: points + 1, lockFlip: true }, () => {
        return;
      });
    }
    if (firstCard.dataset.name !== secondCard.dataset.name) {
      this.setState({ playerMoves: moves - 1 });
      this.flipAgain();
      return;
    }
  };

  flipAgain = () => {
    this.setState({ lockUntilFlip: true });
    setTimeout(() => {
      this.state.firstCard.classList.remove('flip');
      this.state.secondCard.classList.remove('flip');
      this.setState({ lockUntilFlip: false });
    }, 1500);
  };

  render() {
    return (
      <div className="container">
        <ControlPanel
          playerMoves={this.state.playerMoves}
          points={this.state.points}
          handleReset={this.handleReset}
          endGame={this.state.endGame}
          message={ this.state.message }
        />

        <GameContainer
          imgNum={this.state.imgNum}
          cardFlip={this.cardFlip}
          lockFlip={this.state.lockFlip}
          endGame={this.state.endGame}
        />
      </div>
    );
  }
}

export default App;
