import React, { Component } from 'react';
import { Board } from './Board';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      currentStepNumber: 0,
      xIsNext: true,
    };
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
        let xx = { winner: squares[x], winnerRow: lines[i] };
        return xx;
      }
    }

    return { winner: null, winnerRow: null };
  };

  getLocation = (move) => {
    const locationMap = {
      0: 'col: 1, row: 1',
      1: 'col: 2, row: 1',
      2: 'col: 3, row: 1',
      3: 'col: 1, row: 2',
      4: 'col: 2, row: 2',
      5: 'col: 3, row: 2',
      6: 'col: 1, row: 3',
      7: 'col: 2, row: 3',
      8: 'col: 3, row: 3',
    };

    return locationMap[move];
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          currentLocation: this.getLocation(i),
          stepNumber: history.length,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      currentStepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sortMoves() {
    this.setState({
      history: this.state.history.reverse(),
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
      const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
      const classButton = move === this.state.currentStepNumber ? 'item-cyan' : '';

      return (
        <li key={step.stepNumber || 0}>
          <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `${winner} won!!!!!!!`;
    } else if (history.length === 10) {
      status = 'Draw!!!!';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquare={winnerRow}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="button" onClick={() => this.sortMoves()}>
            Sort moves
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}