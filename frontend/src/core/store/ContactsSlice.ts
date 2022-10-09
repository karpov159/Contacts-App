import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactData } from '../../shared/interfaces';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface contactsSliceData {
	contactsLoadingStatus: string;
	entities: ContactData[];
	searchField: string;
}

const initialState: contactsSliceData = {
	contactsLoadingStatus: 'idle',
	entities: [],
	searchField: '',
};

export const fetchContacts = createAsyncThunk(
	'contacts/fetchContacts',
	async () => {
		try {
			const response = await fetch(`${BASE_URL}/contacts`);

			if (!response.ok) {
				throw new Error('Error');
			}

			const data = await response.json();

			return data;
		} catch (e) {
			throw e;
		}
	}
);

export const addContact = createAsyncThunk(
	'contacts/addContact',
	async (body: {
		email: string;
		firstName: string;
		secondName: string;
		phone: string;
	}) => {
		fetch(`${BASE_URL}/contacts`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
);

export const deleteContact = createAsyncThunk(
	'contacts/deleteContact',
	async (id: string) => {
		fetch(`${BASE_URL}/contacts/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
);

export const updateContact = createAsyncThunk(
	'contacts/updateContact',
	async ({ email, firstName, secondName, phone, id }: ContactData) => {
		fetch(`${BASE_URL}/contacts/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ email, firstName, secondName, phone }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
);

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		searchFieldHasChanged: (state, action) => {
			state.searchField = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, (state) => {
				state.contactsLoadingStatus = 'loading';
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.entities = action.payload;
				state.contactsLoadingStatus = 'idle';
			})
			.addCase(fetchContacts.rejected, (state) => {
				state.contactsLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const { reducer, actions } = contactsSlice;

export const { searchFieldHasChanged } = actions;

export default reducer;
