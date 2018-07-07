import React, { Component } from 'react';

export class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    }

    render() {
        return (
          <button className={`${this.props.winnerClass}` == '' ? 'square' : `${this.props.winnerClass} square`} onClick={this.props.onClick}>
            {this.props.value}
          </button>
        );
      }
    }