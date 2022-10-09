import { Dispatch, SetStateAction } from 'react';

const onChangeInput = (
	event: { target: HTMLInputElement },
	func: Dispatch<SetStateAction<string>>
) => {
	func(event.target.value);
};

export default onChangeInput;
