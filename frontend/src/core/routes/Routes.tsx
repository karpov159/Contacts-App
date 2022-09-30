import { Routes, Route } from 'react-router-dom';
import { LOGIN, HOMEPAGE } from '../config/RoutesConfig';
import { Login } from '../../pages';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={LOGIN} element={<Login />}></Route>
			<Route path={HOMEPAGE} element={<h2>homepage</h2>} />
		</Routes>
	);
};

export default AppRoutes;
