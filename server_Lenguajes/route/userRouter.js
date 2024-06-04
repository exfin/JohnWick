import express from 'express';
import { addUser, getUsersEuropa, getUsersAmerica, addCastigo, getCastigos } from '../controller/userController.js';


const userRouter = express.Router();

userRouter.post('/add', addUser);
userRouter.get('/get-europa', getUsersEuropa);
userRouter.get('/get-america', getUsersAmerica);
userRouter.post('/add-castigo', addCastigo);
userRouter.get('/get-castigos', getCastigos);

export default userRouter;