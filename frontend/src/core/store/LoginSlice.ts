import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface LoginSliceState {
	authLoadingStatus: string;
	isLoggedIn: boolean;
}

const loginAdapter = createEntityAdapter();

const initialState: LoginSliceState = loginAdapter.getInitialState({
	authLoadingStatus: 'idle',
	isLoggedIn: false,
});

export const login = createAsyncThunk(
	'login/auth',
	async (body: { username: string; password: string }) => {
		try {
			const response = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const error: { status: number; message: string } =
					await response.json();

				throw new Error(error.message);
			}

			const data = await response.json();

			return data;
		} catch (e) {
			throw e;
		}
	}
);

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLoggedIn(state, action: PayloadAction<boolean>) {
			state.isLoggedIn = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.authLoadingStatus = 'loading';
			})
			.addCase(login.fulfilled, (state) => {
				state.authLoadingStatus = 'idle';
			})
			.addCase(login.rejected, (state) => {
				state.authLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const { reducer, actions } = loginSlice;

export const { setLoggedIn } = actions;

export default reducer;
