import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  console.log('get /api/diagnosis');
  res.send(diagnoseService.getEntries());
});

export default diagnosesRouter;