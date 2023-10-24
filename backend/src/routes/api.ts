import { getActionsCredits, addAction, executeAction, getActions } from '../controllers/actionsController';
import express, { Request, Response, NextFunction, Router } from 'express';

const apiRouter: Router = express.Router();

apiRouter.post('/actions', addAction);
apiRouter.get('/actions', getActions);
apiRouter.get('/actionsCredits', getActionsCredits);
apiRouter.get('/actions/execute', executeAction);

export default apiRouter;
