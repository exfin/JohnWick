import express from 'express';
import { addConflict, getAllConflicts, solveConflict, } from "../controller/conflictController.js";

const conflictRouter = express.Router();

conflictRouter.post('/create', addConflict)
conflictRouter.get('/get', getAllConflicts)
conflictRouter.post('/solve-conflict', solveConflict)

export default conflictRouter