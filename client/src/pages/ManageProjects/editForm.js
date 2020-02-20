import React, { useState } from "react";
import formik from "formik";
import Form from "react-bootstrap/Form";

const ManageProjectsEditForm = props => {
  return (
    <Formik initialValues={{}} onSubmit={submit} validationSchema={schema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        setFieldTouched
      }) => <Form noValidate onSubmit={handleSubmit}></Form>}
    </Formik>
  );
};

export default ManageProjectsEditForm;
