import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Icon, Item, Button, SemanticICONS } from "semantic-ui-react";

import AddEntryModal from "../AddEntryModal";
import { Patient, Gender, Diagnosis, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientData, setDiagnosisList } from "../state";

const PatientListPage: React.FC = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.log(e);
      }
    };

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFromApi);
        dispatch(setPatientData(patientFromApi));
      } catch (e) {
        console.log(e);
      }
    };

    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      // NOTE: execute fetchDiagnosis first!
      fetchDiagnosis();
      fetchPatient();
    }
  }, [id, patients, dispatch]);

  const genderIconRender = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'other gender';
    }
  };

  const entryTypeIcon = (type: string): SemanticICONS => {
    switch (type) {
      case 'HealthCheck':
        return 'doctor';
      case 'Hospital':
        return 'hospital';
      case 'OccupationalHealthcare':
        return 'ambulance';
      default:
        return 'heartbeat';
    }
  };

  const getDiagnosisDesc = (code: string): string => {
    return diagnosis[code].name;
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatientData(newEntry));
      // setPatient(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  }

  return (
    <div className="App">
      { patient && (
        <div>
          <h2>
            {patient.name}
            <Icon name={genderIconRender(patient.gender)} />
          </h2>
          <div>SSN: {patient.ssn}</div>
          <div>Occupation: {patient.occupation}</div>
          <Card fluid>
            <Card.Content>
              <Item.Group>
                {patient.entries && (
                  patient.entries.map(entry => (
                      <Item key={entry.id}>
                        <Item.Content>
                          <Item.Header>
                            {entry.date}
                            <Icon name={entryTypeIcon(entry.type)} style={{marginLeft: '10px'}} />
                          </Item.Header>
                          <Item.Meta>{entry.description}</Item.Meta>
                          <Item.Description>
                            <ul>
                              {entry.diagnosisCodes && (
                                entry.diagnosisCodes.map(code => (
                                  <li key={code}>{code} - {getDiagnosisDesc(code)}</li>
                                ))
                              )
                              }
                            </ul>
                          </Item.Description>
                        </Item.Content>
                      </Item>
                  ))
                )}
              </Item.Group>
            </Card.Content>
          </Card>
        </div>
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add new entry</Button>
    </div>
  );
};

export default PatientListPage;
