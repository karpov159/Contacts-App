import { useEffect, ChangeEvent } from 'react';
import { ContactData } from '../../shared/interfaces';
import { useAppDispatch, useAppSelector } from '../../core/store';
import {
	fetchContacts,
	addContact,
	updateContact,
	deleteContact,
	searchFieldHasChanged,
} from '../../core/store/ContactsSlice';
import Button from '@mui/material/Button';
import Spinner from '../../components/Spinner/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Contact from '../../components/Contact/Contact';

import './ContactsPage.css';

const ContactsPage = () => {
	const { contactsLoadingStatus, entities, searchField } = useAppSelector(
		(state) => state.contacts
	);
	const dispatch = useAppDispatch();

	const renderContacts = (contacts: ContactData[]) => {
		return contacts.map(
			({ id, firstName, secondName, phone, email }: ContactData) => (
				<Contact
					key={id}
					id={id}
					firstName={firstName}
					secondName={secondName}
					phone={phone}
					email={email}
					contactHasUpdated={contactHasUpdated}
					contactHasDeleted={contactHasDeleted}
				/>
			)
		);
	};

	const contactHasUpdated = (updatedContact: ContactData) => {
		dispatch(updateContact(updatedContact))
			.unwrap()
			.then(() => dispatch(fetchContacts()));
	};

	const contactHasDeleted = (id: string) => {
		dispatch(deleteContact(id))
			.unwrap()
			.then(() => dispatch(fetchContacts()));
	};

	const contactHasAdded = () => {
		const newContact = {
			email: '',
			firstName: '',
			secondName: '',
			phone: '',
		};

		dispatch(addContact(newContact))
			.unwrap()
			.then(() => dispatch(fetchContacts()));
	};

	const onChangeSearchField = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		dispatch(searchFieldHasChanged(value));
	};

	const filterContacts = (contacts: ContactData[]) => {
		if (searchField) {
			return contacts.filter((item) => {
				const fullName = item.firstName + ' ' + item.secondName;

				return fullName.indexOf(searchField) >= 0;
			});
		}

		return contacts;
	};

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	const spinner = contactsLoadingStatus === 'loading' ? <Spinner /> : null;
	const content = renderContacts(filterContacts(entities));

	return (
		<section className='wrapper'>
			<div className='wrapper__content'>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<TextField
						value={searchField}
						onChange={onChangeSearchField}
						label='Поиск по имени'
						sx={{ width: '300px' }}
					/>

					<Button onClick={contactHasAdded}>Добавить контакт</Button>
				</Box>
				{spinner}

				<TableContainer component={Paper} sx={{ mt: 3 }}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Почта</TableCell>
								<TableCell>Фамилия</TableCell>
								<TableCell>Имя</TableCell>
								<TableCell>Телефон</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{content}</TableBody>
					</Table>
				</TableContainer>
			</div>
		</section>
	);
};

export default ContactsPage;
