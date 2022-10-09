import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/store';
import { login } from '../../core/store/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { userLocalStorage } from '../../core/LocalStorage/userLocalStorage';
import { HOMEPAGE } from '../../core/config/RoutesConfig';
import { setLoggedIn } from '../../core/store/LoginSlice';
import onChangeInput from '../../shared/onChangeInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { authLoadingStatus } = useAppSelector((state) => state.login);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 300,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		textAlign: 'center',
	};

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(login({ username, password }))
			.unwrap()
			.then((results) => {
				userLocalStorage.setItem(results);
				dispatch(setLoggedIn(true));
				navigate(HOMEPAGE);
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<Box onSubmit={onSubmit} component='form' sx={style}>
			<Typography id='modal-modal-title' variant='h6' component='h2'>
				Вход в личный кабинет
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<TextField
					value={username}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						onChangeInput(event, setUsername)
					}
					error={authLoadingStatus === 'error'}
					label='Логин'
					variant='standard'
					size='medium'
					margin='normal'
					fullWidth
					type='email'
				/>
			</Box>

			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<TextField
					value={password}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						onChangeInput(event, setPassword)
					}
					error={authLoadingStatus === 'error'}
					label='Пароль'
					variant='standard'
					size='medium'
					type='password'
					margin='normal'
					fullWidth
				/>
			</Box>

			{error ? (
				<Typography color='red' variant='body1'>
					{error}
				</Typography>
			) : null}

			<Button variant='outlined' type='submit' sx={{ mt: 2 }}>
				Продолжить
			</Button>
		</Box>
	);
};

export default LoginPage;
