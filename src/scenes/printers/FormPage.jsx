import { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import { Formik, Form } from 'formik';

import AditionalForm from './Forms/AditionalForm';
import TecnicalForm from './Forms/TecnicalForm';

import validationSchema from './FormModel/validationSchema';
import printerFormModel from './FormModel/printerFormModel';
import formInitialValues from './FormModel/formInitialValues';

const steps = ['Informacion Tecnica', 'Informacion Adicional'];
const { formId, formField } = printerFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <TecnicalForm formField={formField} />;
    case 1:
      return <AditionalForm formField={formField} />;
    default:
      return <div>Not found</div>;
  }
}

export default function FormPage({ title, open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function _submitForm(values, actions) {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setActiveStep(0);
      }, 200);
    }, 2000);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      handleNext();
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle
          sx={{
            background: '#444',
            fontSize: '20px',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: 4,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <h5>Formulario Enviado</h5>
            ) : (
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {_renderStepContent(activeStep)}

                    <DialogActions sx={{ marginTop: 2 }}>
                      <Box
                        display="flex"
                        justifyContent="end"
                        mt="20px"
                        gap="10px"
                      >
                        {activeStep !== 0 && (
                          <Button
                            variant="contained"
                            color="neutral"
                            onClick={handleBack}
                          >
                            Atras
                          </Button>
                        )}
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={isSubmitting}
                        >
                          {isLastStep ? 'Agregar' : 'Siguiente'}
                        </Button>
                        {isSubmitting && <CircularProgress size={24} />}
                      </Box>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}
