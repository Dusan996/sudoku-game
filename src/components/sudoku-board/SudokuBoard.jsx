import { useState, useEffect } from 'react';

import { deepCopy } from '../../util';
import { SudokuField } from './sudoku-field';

import { initialBoard, finishedBoard } from '../../initialBoard';

export const SudokuBoard = () => {
	const [sudokuBoard, setSudokuBoard] = useState([]);
	const [gameStatus, setGameStatus] = useState('');
	const [showMessage, setShowMessage] = useState(false);

	const convertValue = (val) => (val !== null ? val : '');

	const checkBoard = () => {
		setShowMessage(true);
		if (JSON.stringify(sudokuBoard) === JSON.stringify(finishedBoard)) {
			setGameStatus('Completed!');
			return setShowMessage(true);
		}
	};

	useEffect(() => {
		setSudokuBoard(initialBoard);
	}, []);
	const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	const checkRow = (row, number) => sudokuBoard[row].includes(number);

	const checkCol = (column, number) =>
		sudokuBoard.map((row) => row[column]).includes(number);

	const checkBox = (row, column, number) => {
		const box = [];
		const rowStart = row - (row % 3);
		const colStart = column - (column % 3);
		for (let i = 0; i < 3; i++) {
			for (let y = 0; y < 3; y++) {
				box.push(sudokuBoard[rowStart + i][colStart + y]);
			}
		}
		return box.includes(number);
	};

	const isValid = (row, column, number) => {
		if (
			checkRow(row, number) &&
			checkCol(column, number) &&
			checkBox(row, column, number)
		) {
			setShowMessage(false);
			return setGameStatus('Duplicate input');
		}
		return setGameStatus('');
	};

	const onInputChange = (e, row, col) => {
		const value = parseInt(e.target.value) || null;
		const board = deepCopy(sudokuBoard);
		if (value === null || (value > 0 && value < 10) || value === '') {
			board[row][col] = value;
		}
		setSudokuBoard(board);
		isValid(row, col, value);
	};

	const resetBoard = () => setSudokuBoard(initialBoard);
	const getSolution = () => setSudokuBoard(finishedBoard);

	return (
		<div className='sudoku-container'>
			{showMessage && <p>{gameStatus}</p>}
			<div>
				{sudokuBoard.length &&
					rows.map((row, index) => {
						return (
							<div key={row}>
								{rows.map((col, index) => {
									return (
										<SudokuField
											value={convertValue(sudokuBoard[row][col])}
											onChange={(e) => onInputChange(e, row, col)}
											key={col + row}
											disabled={initialBoard[row][col] !== null}
										/>
									);
								})}
							</div>
						);
					})}
			</div>
			<div className='button-container'>
				<button onClick={checkBoard}>Check Answers</button>
				<button onClick={resetBoard}>Reset</button>
				<button onClick={getSolution}>Get Solution</button>
			</div>
		</div>
	);
};
