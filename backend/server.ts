import * as bodyParser from 'body-parser';
import { create, defaults, router as jsonRouter } from 'json-server';
import * as jwt from 'jsonwebtoken';

const PORT = process.env.PORT ?? 3001;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'MySecretKey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '48h';

const server = create();

const router = jsonRouter('db.json');
const middlewares = defaults();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);

server.post('/auth/login', (req, res) => {
	const payload: { username: string; password: string } = {
		username: req.body.username,
		password: req.body.password,
	};
	const user: {
		id: number;
		firstName: string;
		secondName: string;
		accessToken: string;
	} | null =
		(router.db.get('users') as any)
			.find({ username: payload.username, password: payload.password })
			.value() ?? null;

	if (user) {
		const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
			expiresIn: JWT_EXPIRES_IN,
		});
		res.status(200).json({
			accessToken,
			id: user.id,
			firstName: user.firstName,
			secondName: user.secondName,
		});
	} else {
		const status = 401;
		const message = 'Имя пользователя или пароль введены не верно';
		res.status(status).json({ status, message });
	}
});

server.use(router);

server.listen(PORT, () => {
	console.log(`JSON Server is running on port: ${PORT}`);
});
