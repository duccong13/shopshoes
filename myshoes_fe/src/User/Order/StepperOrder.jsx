import { Box, Step, StepLabel, Stepper } from "@mui/material";
import * as React from "react";
import AddressOrder from "./AddressOrder";
import PaymentOrder from "./PaymentOrder";

const steps = ["Chọn đơn hàng", "Địa chỉ giao hàng", "Đặt hàng", "Thanh toán"];

export default function StepperOrder({ step }) {
  return (
    <Box sx={{ width: "100%", marginBottom:3 }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
