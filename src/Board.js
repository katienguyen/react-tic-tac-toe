import React, { Component } from 'react';
import { Square } from './Square';

export class Board extends Component {
    createBoard(col, row) {
        const board = [];
        let cellCouter = 0;
        for (let i = 0; i < col; i ++) {
            const rows = [];
            for (let j = 0; j < row; j ++) {
                rows.push(this.renderSquare(cellCouter++));
            }
            board.push(<div key={i} className="board-row">{rows}</div>);
        }
        return board;
    }

    renderSquare(i) {
        const winnerClass = this.props.winnerSquare && (this.props.winnerSquare[0] === i || this.props.winnerSquare[1] === i || this.props.winnerSquare[2] === i) ? 'win-squares' : ''; 
        return (
            <Square
                key={i}
                winnerClass={winnerClass}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return (
            <div>
                {this.createBoard(3, 3)}
            </div>
        );
    }
}