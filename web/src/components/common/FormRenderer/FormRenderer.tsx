import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import validationFormat from "./helpers/validation";
import FormElement from "./FormElement";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import StyledButton from '../StyledButton/StyledButton';
// import { saveLibrariesMasterData } from "../../../store/components/library/library";
import { getDynamicFormData } from "../../../store/components/uiInteraction/uiInteraction";
import "./formstyle.scss";

const FormRenderer = (props: any) => {
  const dispatch = useAppDispatch();
  // const initialValues = {};
  // const validationData = {};
  const dynamicFormData: any = useAppSelector(getDynamicFormData);
  const [initialValues, setInitialValues] = useState({});
  const [validationData, setValidationData] = useState({});
  const [formData, setFormData] = useState([]);

  const loadFormData = () => {
    const localInitialValues = {};
    const localValidationData = {};
    setFormData(
      props.formData.formElements.map((element: any) => {
        const { validation, value, ...elements } = element;
        localInitialValues[elements.name] = value;
        localValidationData[elements.name] = validationFormat[validation];
        return elements;
      })
    );
    setInitialValues(localInitialValues);
    setValidationData(localValidationData);
  };

  useEffect(() => {
    loadFormData();
  }, []);

  useEffect(() => {
    loadFormData();
  }, [props.formData]);

  const validationSchema = Yup.object(validationData);

  const onSubmit = (values) => {
    console.log("Form data", values, dynamicFormData);
    if (
      dynamicFormData.submitCB &&
      typeof dynamicFormData.submitCB === "function"
    )
      dynamicFormData.submitCB(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form className="form-main">
              {formData.length &&
                formData.map((formElement: any, index: any) => {
                  return <FormElement key={index} {...formElement} />;
                })}
              <div className="div-center">
                <StyledButton
                  type="submit"
                  variant="contained"
                  disabled={!formik.isValid}
                  compact
                  sx={{
                    minWidth: '80px',
                    fontSize: '0.75rem',
                    height: '28px',
                    px: 1.5
                  }}
                >
                  Submit
                </StyledButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormRenderer;
