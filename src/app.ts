import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { handleErrors } from './error';
import { userRoute } from './routers/user.route';
import { contactRoute } from './routers/contact.route';
import { loginRouter } from './routers/login.route';

const app = express();
app.use(express.json());

app.use(cors());

app.use('/users', userRoute);
app.use('/contacts', contactRoute);
app.use('/login', loginRouter);

app.use(handleErrors);

export default app;
