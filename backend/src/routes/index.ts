import express, { Request, Response, NextFunction, Router } from 'express';
const indexRouter: Router = express.Router();

/* GET home page. */
indexRouter.get('/', function(req: Request, res: Response, next: NextFunction): any {
  res.render('index', { title: 'Express' });
});

export default indexRouter;

