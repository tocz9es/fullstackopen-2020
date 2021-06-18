import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  console.log('get /api/patients');
  res.send(patientService.getPatients());
});

patientsRouter.get('/:id', (req, res) => {
  console.log('get /api/patients/:id');
  try {
    const foundPatient = patientService.getPatient(req.params.id);
    res.json(foundPatient);
  } catch (e) {
    console.log('error');
  }
});

patientsRouter.post('/', (req, res) => {
  console.log('post /api/patients');

  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

patientsRouter.post('/:id/entries', (req, res) => {
  console.log('post /api/patients/:id/entries');

  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, newEntry);
    res.json(updatedPatient);
  } catch (e) {
    console.log('error', e);
  }
});

export default patientsRouter;