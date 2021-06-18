import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { Diagnosis, EntryType } from '../types'

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field type="number" min={min} max={max} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
)

export const EntrySelection = ({
  entryTypes,
  setFieldValue,
  setFieldTouched
}: {
  entryTypes: EntryType[];
  setFieldValue: FormikProps<{ type: EntryType }>["setFieldValue"];
  setFieldTouched: FormikProps<{ type: EntryType }>["setFieldTouched"];
}) => {
  const field = "type";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    console.log(data)
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = entryTypes.map(entry => ({
    key: entry,
    text: entry === EntryType.HealthCheck
      ? "Health Check"
      : entry === EntryType.OccupationalHealthcare
        ? "Occupational Healthcare"
        : "Hospital",
    value: entry
  }))

  return (
    <Form.Field>
      <label>Entry Type</label>
      <Dropdown
        fluid
        selection
        options={stateOptions}
        onChange={onChange}
        defaultValue={EntryType.HealthCheck}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  )
}

export const EntryTypeField: React.FC<{ type: EntryType }> = ({
  type
}) => {
  switch (type) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
        />
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employee's Name"
            placeholder="Employee's Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      )
  }
}

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
