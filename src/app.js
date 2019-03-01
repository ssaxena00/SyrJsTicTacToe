import { Component, Render, View, LinearGradient, Text, Button } from '../index';

import { Styles } from './Styles/main';

class TicTacToe extends Component {
  constructor() {
    super();
    this.turns = 0;
    this.state = {
      result: '',
      notStarted: true,
      board: [[null, null, null],
              [null, null, null],
              [null, null, null]]
    };
  }

  clone(board) {
    var newBoard = [[], [], []];
    for (var i = 0; i < 3; i += 1) {
      for (var j = 0; j < 3; j += 1) {
        newBoard[i][j] = board[i][j];
      }
    }
    return newBoard;
  }

  checkForWin(board) {
    var winner = null;

    //checking the diagonals
    if (board[1][1] !== null &&
       ((board[0][0] === board[1][1]
         && board[2][2] === board[1][1])
        || (board[0][2] === board[1][1]
            && board[2][0] === board[1][1]))) {
      winner = board[1][1];
      return winner;
    }
    else {
      //Checking the horizontals
      for (var row in board) {
        if (board[row][0] !== null &&
           board[row][0] === board[row][1]
           && board[row][2] === board[row][1]) {
          winner = board[row][0];
          return winner;
        }
      }
      //Verticals
      for (var col in board) {
        if (board[0][col] !== null &&
           board[0][col] === board[1][col]
           && board[1][col] === board[2][col]) {
          winner = board[0][col];
          return winner;
        }
      }
    }
    return winner;
  }

  getAvailableMoves(board) {
		var moves = [];

		for (var row in board)
			for (var col in board[row])
				if (board[row][col] === null)
					moves.push([row, col]);

		return moves;
	}

  evaluate(board) {
    var score = 0;
    score += this.evaluateLine(board, 0, 0, 0, 1, 0, 2);  // row 0
    score += this.evaluateLine(board, 1, 0, 1, 1, 1, 2);  // row 1
    score += this.evaluateLine(board, 2, 0, 2, 1, 2, 2);  // row 2
    score += this.evaluateLine(board, 0, 0, 1, 0, 2, 0);  // col 0
    score += this.evaluateLine(board, 0, 1, 1, 1, 2, 1);  // col 1
    score += this.evaluateLine(board, 0, 2, 1, 2, 2, 2);  // col 2
    score += this.evaluateLine(board, 0, 0, 1, 1, 2, 2);  // diagonal
    score += this.evaluateLine(board, 0, 2, 1, 1, 2, 0);  // alternate diagonal
    return score;
  }

  evaluateLine(board, r1, c1, r2, c2, r3, c3) {
		var score = 0;

		//First cell
		if(board[r1][c1] === 1)
			score = 1;
		else if(board[r1][c1] === 2)
			score = -1;

		//Second cell
		if(board[r2][c2] === 1) {
			if(score == 1)
				score = 10;
			else if (score === -1)
				return 0;
			else
				score = 1;
		}
		else if(board[r2][c2] === 2){
			if(score == -1)
				score = -10;
			else if (score === 1)
				return 0;
			else
				score = -1;
		}

		//Final cell
		if(board[r3][c3] === 1){
			if(score > 1)
				score *= 10;
			else if (score < 0)
				return 0;
			else
				score = 1;
		}
		else if(board[r3][c3] === 2){
			if(score < 0)
				score *= 10;
			else if (score > 1)
				return 0;
			else
				score = -1;
		}
		return score;
	}

  minimax(board, player) {
    var bestScore = -10;
    var currScore = 0;
    var moves = this.getAvailableMoves(board);

    var winner = this.checkForWin(board);
    if(winner !== null || moves.length === 0)
      return this.evaluate(board);

    //Maximize
    if(player === 1) {
      bestScore = -10;
      for(var move in moves) {
        var newBoard = this.clone(board);
        newBoard = this.makeMove(newBoard, 1, moves[move]);
        currScore = this.minimax(newBoard, 2);
        if(currScore > bestScore) {
          bestScore = currScore;
        }
      }
      return bestScore;
    }

    //Minimize
    if(player === 2) {
      bestScore = 10;
      for(var move in moves) {
        var newBoard = this.clone(board);
        newBoard = this.makeMove(newBoard, 2, moves[move]);
        currScore = this.minimax(newBoard, 1);
        if(currScore < bestScore) {
          bestScore = currScore;
        }
      }
      return bestScore;
    }
  }

  getBestMove(board) {
		var bestScore = -10;
		var currScore = 0;
		var bestMove = null;
		var moves = this.getAvailableMoves(board);
		var corners = [[0, 0], [0, 2], [2, 0], [2, 2]];

    //Easy options for the first few game states
    if(this.turns === 1 && board[1][1] === null)
			return [1, 1];
		else if(this.turns === 1)
			return corners[Math.floor(Math.random() * 4)];

		for(var move in moves) {
			var newBoard = this.clone(board);
			newBoard = this.makeMove(newBoard, 1, moves[move]);
			currScore = this.minimax(newBoard, 2);
			if(currScore > bestScore) {
				bestScore = currScore;
				bestMove = moves[move];
			}
		}
		return bestMove;
	}

  makeMove(board, player, point) {
    var row = point[0];
    var col = point[1];
    var newBoard = this.clone(board);
    newBoard[row][col] = player;
    return newBoard;
  }

  onTilePress(x, y) {
    this.state.notStarted = false;
    if (this.state.board[x][y] === null) {
      //user = 1
      var newBoard = this.makeMove(this.state.board, 1, [x, y]);
      this.setState({
        board: newBoard
      });
      this.turns += 1;
      if (this.turns >= 9) {
        this.setState({
          result: 'Tie!'
        });
      }
      //AI = 2
      var nBoard = this.makeMove(this.state.board, 2, this.getBestMove(this.state.board));
      this.setState({
        board: nBoard
      });
      this.turns += 1;
      if (this.checkForWin(this.state.board) === 2) {
        this.setState({
          result: 'You Lost!'
        });
      }
    }
  }

  showIcon(x, y) {
    if (this.state.board[x][y] === 1) {
      return 'X';
    } else if (this.state.board[x][y] === 2) {
      return 'O';
    }
    return '';
  }

  decidePrompt() {
    if (this.state.notStarted) {
      return 'Start!';
    } else if (this.state.result !== '') {
      return 'Click here to play again!';
    }
    return '';
  }

  restart() {
    if (this.state.result === '') {
      return;
    } else {
      this.turns = 0;
      var newBoard = [[null, null, null],
                      [null, null, null],
                      [null, null, null]];
      this.setState({
        notStarted: true,
        result: '',
        board: newBoard
      });
    }
  }

  render() {
    return (
      <LinearGradient colors={['#a3a3a3', '#FFFFFF']} style={Styles.mainView}>
        <Text style={Styles.header}>Tic Tac Toe</Text>
        <Button
          style={Styles.promptArea}
          onPress={() => {this.restart()}}>
            {this.decidePrompt()}
        </Button>
        <View style={Styles.boardView}>
          <Button
            onPress={() => {
              this.onTilePress(0, 0)
            }}
            style={Styles.tile(0, 0)}
          >
            {this.showIcon(0, 0)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(0, 1)
            }}
            style={Styles.tile(0, 1)}
          >
            {this.showIcon(0, 1)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(0, 2)
            }}
            style={Styles.tile(0, 2)}
          >
            {this.showIcon(0, 2)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(1, 0)
            }}
            style={Styles.tile(1, 0)}
          >
            {this.showIcon(1, 0)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(1, 1)
            }}
            style={Styles.tile(1, 1)}
          >
            {this.showIcon(1, 1)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(1, 2)
            }}
            style={Styles.tile(1, 2)}
          >
            {this.showIcon(1, 2)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(2, 0)
            }}
            style={Styles.tile(2, 0)}
          >
            {this.showIcon(2, 0)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(2, 1)
            }}
            style={Styles.tile(2, 1)}
          >
            {this.showIcon(2, 1)}
          </Button>
          <Button
            onPress={() => {
              this.onTilePress(2, 2)
            }}
            style={Styles.tile(2, 2)}
          >
            {this.showIcon(2, 2)}
          </Button>
        </View>
        <Text style={Styles.result}>{this.state.result}</Text>
      </LinearGradient>
    );
  }

}

Render(TicTacToe);
