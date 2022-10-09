import { ContactData } from '../../shared/interfaces';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import onChangeInput from '../../shared/onChangeInput';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface ContactExtendedData extends ContactData {
	contactHasUpdated: (data: ContactData) => void;
	contactHasDeleted: (id: string) => void;
}

const Contact = ({
	id,
	email,
	firstName,
	secondName,
	phone,
	contactHasUpdated,
	contactHasDeleted,
}: ContactExtendedData) => {
	const [isEdit, setEdit] = useState(false);
	const [emailInput, setEmailInput] = useState(email);
	const [firstNameInput, setFirstNameInput] = useState(firstName);
	const [secondNameInput, setSecondNameInput] = useState(secondName);
	const [phoneInput, setPhoneInput] = useState(phone);

	const startEdit = () => {
		setEdit(true);
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			saveEdited();
		}
	};

	const saveEdited = () => {
		const updatedContact = {
			email: emailInput,
			firstName: firstNameInput,
			secondName: secondNameInput,
			phone: phoneInput,
			id,
		};

		contactHasUpdated(updatedContact);

		setEdit(false);
	};

	const renderContact = ({
		id,
		email,
		firstName,
		secondName,
		phone,
	}: ContactData) => {
		if (isEdit) {
			return (
				<TableRow
					sx={{
						'&:last-child td, &:last-child th': {
							border: 0,
						},
					}}>
					<TableCell component='th' scope='row'>
						<TextField
							size='small'
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								onChangeInput(event, setEmailInput)
							}
							value={emailInput}
							onKeyDown={onKeyDown}
						/>
					</TableCell>

					<TableCell>
						<TextField
							size='small'
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								onChangeInput(event, setSecondNameInput)
							}
							value={secondNameInput}
							onKeyDown={onKeyDown}
						/>
					</TableCell>

					<TableCell>
						<TextField
							size='small'
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								onChangeInput(event, setFirstNameInput)
							}
							value={firstNameInput}
							onKeyDown={onKeyDown}
						/>
					</TableCell>

					<TableCell>
						<TextField
							size='small'
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								onChangeInput(event, setPhoneInput)
							}
							value={phoneInput}
							onKeyDown={onKeyDown}
						/>
					</TableCell>

					<TableCell>
						<Button onClick={saveEdited}>Сохранить</Button>
					</TableCell>

					<TableCell>
						<Button onClick={() => contactHasDeleted(id)}>
							Удалить
						</Button>
					</TableCell>
				</TableRow>
			);
		} else {
			return (
				<TableRow
					key={id}
					sx={{
						'&:last-child td, &:last-child th': {
							border: 0,
						},
					}}>
					<TableCell component='th' scope='row'>
						{emailInput}
					</TableCell>
					<TableCell>{secondNameInput}</TableCell>
					<TableCell>{firstNameInput}</TableCell>
					<TableCell>{phoneInput}</TableCell>
					<TableCell>
						<Button onClick={startEdit}>Изменить</Button>
					</TableCell>

					<TableCell>
						<Button onClick={() => contactHasDeleted(id)}>
							Удалить
						</Button>
					</TableCell>
				</TableRow>
			);
		}
	};

	const contact = renderContact({ id, firstName, secondName, phone, email });

	return <>{contact}</>;
};

export default Contact;
