import { Request, Response } from 'express';
import { Action } from '../models/actionModel';
import { actionQueue, actionCredits, setExecutionCredits, getExecutionCredits } from '../queue';

export const getActions = (req: Request, res: Response) => {
  res.json(actionQueue);
};

export const getActionsCredits = (req: Request, res: Response) => {
  res.json(actionCredits);
};

export const addAction = (req: Request, res: Response) => {
  const type: string = req.body.type;
  const action = actionCredits.find(action => action.type === type);

  if (type && action) {
    actionQueue.push(type); // Ajoutez l'action à la file d'attente
    res.json({ message:'Action ajoutée à la file d\'attente.'});
  } else {
    res.status(400).json({ error:'Type d\'action invalide.'});
  }
};

export const executeAction = (req: Request, res: Response) => {
  if (actionQueue.length > 0) {
    const firstAction = actionQueue[0];
    if(firstAction) {
      const credit = getExecutionCredits(firstAction)
      actionQueue.shift();
      if(credit && credit > 0) {
        setExecutionCredits(firstAction, credit - 1)
        res.status(200).json({message:`L'action est executé avec succès`, action:firstAction});
      } else {
        res.status(200).json({message: 'Il ne reste plus de crédit pour cette action', action:firstAction})
        actionQueue.push(firstAction);
      }
    }
  } else {
    res.status(400).json({ message: 'Aucune action disponible dans la file d\'attente' })
  }
};
