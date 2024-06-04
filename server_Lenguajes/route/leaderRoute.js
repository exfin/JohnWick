import express from 'express';

import { addLeader, getAllLeaders } from '../controller/leaderController.js';

const leaderRouter = express.Router();

leaderRouter.post('/add', addLeader);
leaderRouter.get('/get', getAllLeaders);

export default leaderRouter;