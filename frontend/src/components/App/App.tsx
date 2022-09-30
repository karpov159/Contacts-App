import Routes from '../../core/routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { userLocalStorage } from '../../core/LocalStorage/userLocalStorage';
import { setLoggedIn } from '../../core/store/LoginSlice';
import { useAppDispatch } from '../../core/store';
import { useEffect } from 'react';

const App = () => {
	const user = userLocalStorage.getItem();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			dispatch(setLoggedIn(true));
		}
	}, [dispatch, user]);

	return (
		<Router>
			<div className='App'>
				<Routes />
			</div>
		</Router>
	);
};

export default App;
