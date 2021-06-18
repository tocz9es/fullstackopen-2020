import { v4 as uuidv4 } from 'uuid';
import patients from '../data/patients';
import { Patient, NewPatient, Entry, NewEntry } from '../types';

// let patientsData: Patient[] = patients;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = { id: uuidv4(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find(patient => patient.id === patientId);
  const newEntry: Entry = { id: uuidv4(), ...entry };

  if (patient) {
    // patient.entries.push(newEntry);

    patients.forEach(patient => {
      if (patient.id === patientId) {
        patient.entries.push(newEntry);
      }
    });

    return patient;
  } else {
    return undefined;
  }
};

export default {
  getPatients, getPatient, addPatient, addEntry
};
