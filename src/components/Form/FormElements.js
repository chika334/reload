import React from "react";
import { Button } from "@material-ui/core";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
  useField,
  useFormik,
} from "formik";

export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" noValidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

export function TextField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="d-flex align-item-center justify-content-center">
        <Field
          className="form-control"
          type="text"
          name={name}
          // id={name}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div
            // className="d-flex align-item-center justify-content-center"
            style={{
              color: "#cc0033",
            }}
          >
            {msg}
          </div>
        )}
      />
    </>
  );
}

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  // console.log(isSubmitting);
  // console.log(props);

  return (
    <Button
      type="submit"
      style={{
        backgroundColor: "#fda94f",
        color: "#000",
        fontSize: "11px",
        padding: "10px",
      }}
      {...rest}
      disabled={isSubmitting}
    >
      {title}
    </Button>
  );
}
