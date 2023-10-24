import { Request, Response } from 'express';
import { addAction, executeAction } from '../src/controllers/actionsController';

describe('actionsController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  describe('executeAction', () => {
    it('should return an error no action available', () => {
      executeAction(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Aucune action disponible dans la file d\'attente' });
    });
  });

  describe('addAction', () => {
    it('should add an action to the queue', () => {
      // Mocking request body
      req.body = { type: 'A' };

      addAction(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: 'Action ajoutée à la file d\'attente.' });
    });
  });

  describe('addAction', () => {
    it('should not add an action to the queue', () => {
      // Mocking request body
      req.body = { type: 'noType' };

      addAction(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ error: 'Type d\'action invalide.' });
    });
  });
  describe('executeAction', () => {
    it('should execute the first', () => {
      executeAction(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
