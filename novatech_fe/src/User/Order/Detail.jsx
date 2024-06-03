import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

const steps = ["PLACED", "PROCESSED", "CONFIRMED", "SHIPPED", "DELIVERED"];
const Detail = ({ status }) => {
  const handleStatusOrder = (status) => {
    switch (status) {
      case "SHIPPED":
          return 3;
      case "CONFIRMED":
        return 2;
      case "DELIVERED":
        return 4;
      default:
        return 0;
    }
  };
  return (
    <div>
      <Stepper activeStep={handleStatusOrder(status)} orientation="vertical">
        {steps.map((content) => (
          <Step>
            <StepLabel
              optional={
                <Typography variant="body2">4:46p.m 13/05/2024</Typography>
              }
            >
              {content}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default Detail;
