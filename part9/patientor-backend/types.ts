export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum Type {
  Hospital = "Hospital",
  HealthCheck = "Health Check",
  OccupationalHealthcare = "Occupational Healthcare"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
  type: Type.Hospital;
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

interface HealthCheckEntry extends BaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry;
