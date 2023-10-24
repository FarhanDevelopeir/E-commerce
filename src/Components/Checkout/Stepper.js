import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Addressform from './BasicDetails';
import Contactformdetails from './Contactformdetails';
import Paymentmethod from './Paymentmethod';
import { useSelector } from 'react-redux';

const steps = ['Basic Details', 'Address Details', 'Payment Method'];

export default function HorizontalLinearStepper() {
  const contactdetail = useSelector((state) => state.product.contactdetail)
  const addressdetail = useSelector((state) => state.product.addressdetail)
  console.log(contactdetail)

  // useEffect(()=>{
  //   if(contactdetail===null){

  //   }
  // },[])
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
<Box sx={{ width: '60%' }}  >
      <Stepper activeStep={activeStep} >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = (
        //       <Typography variant="caption">Optional</Typography>
        //     );
        //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} >
              <StepLabel {...labelProps} >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button  onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            {activeStep === 0 && <Addressform/>}
        {activeStep === 1 && <Contactformdetails/>}
        {activeStep === 2 && <Paymentmethod/>}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="warning"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" variant="contained" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            <Button disabled={contactdetail === ''} onClick={handleNext} className='btn' variant="contained" color="primary" > 
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          

          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}