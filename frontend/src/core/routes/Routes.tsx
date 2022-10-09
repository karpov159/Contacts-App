import { Routes, Route, Navigate } from 'react-router-dom';
import { LOGIN, HOMEPAGE, BASE } from '../config/RoutesConfig';
import { Login, Contacts } from '../../pages';
import { useAppSelector } from '../store';

const AppRoutes = () => {
	const { isLoggedIn } = useAppSelector((state) => state.login);

	return (
		<Routes>
			<Route
				path={LOGIN}
				element={!isLoggedIn ? <Login /> : <Navigate to={HOMEPAGE} />}
			/>

			<Route
				path={HOMEPAGE}
				element={isLoggedIn ? <Contacts /> : <Navigate to={LOGIN} />}
			/>

			<Route
				path={BASE}
				element={
					isLoggedIn ? (
						<Navigate to={HOMEPAGE} />
					) : (
						<Navigate to={LOGIN} />
					)
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
