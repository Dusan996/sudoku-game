import React from 'react';

export const SudokuField = ({ value, onChange, disabled, className }) => {
	return (
		<>
			<input
				onChange={onChange}
				value={value}
				className='sudoku-field'
				type='text'
				disabled={disabled}
			/>
		</>
	);
};
