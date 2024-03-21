import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import Button from '@mui/material/Button';
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Addressform from "./BasicDetails";
import Contactformdetails from "./Contactformdetails";
import Paymentmethod from "./Paymentmethod";
import { useSelector } from "react-redux";

const steps = ["Basic Details", "Address Details", "Payment Method"];

export default function HorizontalLinearStepper() {
  const contactdetail = useSelector((state) => state.product.contactdetail);
  const addressdetail = useSelector((state) => state.product.addressdetail);
  console.log(contactdetail);

  // useEffect(()=>{
  //   if(contactdetail===null){

  //   }
  // },[])
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
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
    <div data-hs-stepper className="  md:w-[60%] mb-5">
      <ul class="   flex    ">
        <li
          class="flex items-center gap-x-2 shrink basis-0 flex-1 group"
          data-hs-stepper-nav-item='{
          "index": 1
        }'
        >
          <span class="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
              <span class="hs-stepper-success:hidden hs-stepper-completed:hidden">
                1
              </span>
              <svg
                class="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span class="ms-2 text-sm font-medium text-gray-800">Step</span>
          </span>
          <div class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
        </li>

        <li
          class="flex items-center gap-x-2 shrink basis-0 flex-1 group"
          data-hs-stepper-nav-item='{
          "index": 2
        }'
        >
          <span class="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
              <span class="hs-stepper-success:hidden hs-stepper-completed:hidden">
                2
              </span>
              <svg
                class="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span class="ms-2 text-sm font-medium text-gray-800">Step</span>
          </span>
          <div class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
        </li>

        <li
          class="flex items-center gap-x-2 shrink basis-0 flex-1 group"
          data-hs-stepper-nav-item='{
          "index": 2
        }'
        >
          <span class="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
            <span class="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
              <span class="hs-stepper-success:hidden hs-stepper-completed:hidden">
                3
              </span>
              <svg
                class="hidden flex-shrink-0 size-3 hs-stepper-success:block"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span class="ms-2 text-sm font-medium text-gray-800">Step</span>
          </span>
          <div class="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
        </li>
      </ul>

      <div class="mt-5 sm:mt-8">
        <div
          className={`${activeStep === 0 ? "block" : "hidden"}`}
          data-hs-stepper-content-item='{
          "index": 1
        }'
        >
          <Addressform handleNext={handleNext} />
        </div>

        <div
          data-hs-stepper-content-item='{
          "index": 2
        }'
          className={`${activeStep === 1 ? "block" : "hidden"}`}
        >
          <Contactformdetails handleNext={handleNext} />
        </div>

        <div
          data-hs-stepper-content-item='{
          "isFinal": true
        }'
          className={`${activeStep === 2 ? "block" : "hidden"}`}
        >
          <Paymentmethod handleNext={handleNext} />
        </div>

        <div class="mt-5 flex justify-between items-center gap-x-2">
          <button
            type="button"
            class={` ${
              activeStep < 1 ? "hidden" : "block"
            } py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}
            data-hs-stepper-back-btn
            onClick={handleBack}
          >
            <svg
              class="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
          {/* <button
            type="button"
            className={`${activeStep > 1 ? " hidden" : " block"} 
            py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent  bg-blue-600 text-white  disabled:opacity-50 disabled:pointer-events-none
            `}
         
            data-hs-stepper-next-btn
            onClick={handleNext}
          >
            Next
            <svg
              class="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button
            type="button"
            className={`${activeStep === 2 ? " block" : " hidden "} 
            py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent  bg-blue-600 text-white  disabled:opacity-50 disabled:pointer-events-none
            `}
            data-hs-stepper-finish-btn
            
          >
            Finish
          </button> */}
          <button
            type="reset"
            class="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-stepper-reset-btn
            style={{ display: "none" }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
