/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { NewPatient, Gender, Type, Diagnosis, Discharge, HealthCheckRating, BaseEntry, NewEntry, SickLeave } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isType = (type: any): type is Type => {
  return Object.values(Type).includes(type);
};

const isCode = (code: any): boolean => {
  if (!code) {
    return false;
  }
  return /[A-Z]\d\d.\d/.test(code);
};

const isDischarge = (discharge: any): discharge is Discharge => {
  if (!discharge.date || !discharge.criteria || !isDate(discharge.date) || !isString(discharge.criteria)) {
    return false;
  }
  return true;
}; 

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isSickLeave = (sickLeave: any): boolean => {
  return (
    sickLeave.startDate &&
    sickLeave.endDate &&
    isString(sickLeave.startDate) &&
    isString(sickLeave.endDate)
  )
};

const parseString = (string: any): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string.');
  }
  return string;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn.');
  }
  return ssn;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date.');
  }
  return date;
};

const parseGender = (gender: any): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender.');
  }
  return gender;
};

const parseType = (type: any): Type => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type.');
  }
  return type;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!codes) {
    throw new Error('Incorrect or missing diagnosisCodes.');
  }
  codes.forEach((code: any) => {
    if (!isCode(code)) {
      throw new Error('Incorrect or missing diagnosisCodes.');
    }
  });
  return codes;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge.');
  }
  return discharge;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating.');
  }
  return rating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave.');
  }
  return sickLeave;
};

export const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry = {
    name: parseString(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };

  return newEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry: BaseEntry = {
    id: uuidv4(),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  const type = parseType(object.type);

  switch (type) {
    case Type.Hospital:
      return {
        ...baseEntry,
        type,
        discharge: parseDischarge(object.discharge)
      };
    case Type.HealthCheck:
      return {
        ...baseEntry,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case Type.OccupationalHealthcare:
      return {
        ...baseEntry,
        type,
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    default:
      throw new Error('Incorrect entry type');
  }
};