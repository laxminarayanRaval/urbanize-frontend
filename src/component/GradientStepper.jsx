import React, { useEffect } from "react";
import {
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Mood, PersonAdd, PersonSearch, Rule } from "@mui/icons-material";
import { useState } from "react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(200deg, #1976d2 0%, #ea4336 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 200deg, #1976d2 0%, #ea4336 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 10,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
    transition: "all 3s ease-in-out",
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 3s ease-in-out",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient( 110deg, #1976d2 0%, #ea4336 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "linear-gradient( 110deg, #1976d2 0%, #ea4336 100%)",
  }),
}));

function ColorlibStepIcon({ active, completed, className, ...props }) {
  const icons = {
    1: <PersonSearch />,
    2: <PersonAdd />,
    3: <Rule />,
    4: <Mood />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Search via Service",
  "Hire a Professional",
  "Get Work Done",
  "Relax!",
];
const GradientStepper = (props) => {
  const duration = 3;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = moveStepper(duration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const moveStepper = (interval) =>
    setInterval(() => {
      setActiveStep((prevState) =>
        prevState < steps.length - 1 ? prevState + 1 : 0
      );
    }, 1000 * interval);

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={`${label}-${index}`}>
            <StepLabel
              sx={{ fontSize: "5rem" }}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default GradientStepper;
