import React, { Component } from 'react';
import GameContainer from './components/GameContainer';
import ControlPanel from './components/ControlPanel'

const imgID = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]

function shuffle (array) {
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

  state={
    imgNum: shuffle(imgID),
    flipedCard: false,
    firstCard: null,
    secondCard: null,
    lockUntilFlip: false,
    lockFlip: false, 
    playerMoves: 5, 
    points: 0

  }

  handleReset = () => {
    return(
      this.setState({
        imgNum: shuffle(imgID),
        flipedCard: false,
        firstCard: null,
        secondCard: null,
        lockUntilFlip: false,
        lockFlip: false, 
        playerMoves: 5, 
        points: 0
      })
    )
  }

  cardFlip = async (e) => {

    let flipedCard = this.state.flipedCard
    let lockUntilFlip = this.state.lockUntilFlip
    let firstCard = this.state.firstCard
    let targetName = e.target.parentNode

    if(lockUntilFlip) return;
    if(targetName === firstCard) return;
    targetName.classList.toggle('flip');

    if(!flipedCard){
      // Igrač prvi put klikce na kartu
      // Setuje se u state da je flip registrovan na true
      this.setState(() => {return ({ flipedCard: true})})
      this.setState(() => {return ({ firstCard: targetName})})

      // this.setState({ 
      //   flipedCard: true , 
      //   firstCard: targetName ,
      // })
      return;
    }

    // Ako je igrač već kliknuo
    this.setState({ flipedCard: false, secondCard: targetName })

    // Provjera podudarnosti dvije kliknute karte
    this.checkMatch();
  }

  checkMatch = async () => {
    const firstCard = this.state.firstCard
    const secondCard = this.state.secondCard
    const points = this.state.points
    const moves = this.state.playerMoves
    if(firstCard === secondCard){
      // console.log(this.state.lockFlip)
      return (
        this.setState(() => {return({ points:( points + 1)})}),
        this.setState(() => {return({ lockFlip: true})})

        // this.setState({ points: points + 1, lockFlip: true })
        // console.log(this.state.lockFlip)
      )
    }
    if(firstCard !== secondCard){
      return (
        this.setState(() => {return({ playerMoves: (moves - 1) })}),
        this.flipAgain()
      )
    }
  }

  flipAgain = () => {
    this.setState(() => {return({ lockUntilFlip: true })});
    setTimeout(() => {
      this.state.firstCard.classList.remove('flip')
      this.state.secondCard.classList.remove('flip')
      this.setState(() => {return ({ lockUntilFlip: false})})
    }, 1500)
  }

  render() { 
    return ( 
      <div className="container">
        <ControlPanel 
          playerMoves={ this.state.playerMoves }
          points={ this.state.points }
          handleReset={ this.handelReset }

        />

        <GameContainer
          imgNum={ this.state.imgNum}
          cardFlip={ this.cardFlip }
          lockFlip={ this.state.lockFlip }
        />

      </div>
     );
  }
}
 
export default App;
