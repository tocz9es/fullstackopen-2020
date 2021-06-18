import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, EntrySelection, EntryTypeField, DiagnosisSelection } from './FormField'
import { useStateValue } from '../state';
import { EntryType, HealthCheckRating, NewEntry } from '../types'

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm:React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue()

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        discharge: {
          date: "",
          criteria: ""
        },
        // sickLeaveStartDate: "",
        // sickLeaveEndDate: "",
        // dischargeDate: "",
        // dischargeCriteria: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.HealthCheck) {
          if (!values.healthCheckRating && values.healthCheckRating !== 0) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeave.startDate) {
            errors.sickLeaveStartDate = requiredError;
          }
          if (!values.sickLeave.endDate) {
            errors.sickLeaveEndDate = requiredError;
          }
        }
        if (values.type === EntryType.Hospital) {
          if (!values.discharge.date) {
            errors.dischargeDate = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <EntrySelection
              entryTypes={Object.values(EntryType)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnosis)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <EntryTypeField type={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;