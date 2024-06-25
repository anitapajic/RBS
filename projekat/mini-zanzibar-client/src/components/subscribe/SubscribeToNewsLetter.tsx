/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Input, InputTitle } from "../footer/Footer.styled";

function SubscribeNewsletter() {
  const [inputEmail, setInputEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleEmailInput = (event:any) => {
    setInputEmail(event.target.value);
  };

  const handleBookAppointmentClick = () => {
    
  };

  return (
    <div className="ft-info-p2">
      <InputTitle>Stay Update to our Newsletter</InputTitle>
      <Input
        type="text"
        inputMode="email"
        className="ft-input"
        placeholder="Enter your email address"
        name="email"
        value={inputEmail}
        onChange={handleEmailInput}
        autoComplete="true"
      />
      <Button
        className="text-appointment-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleBookAppointmentClick}
      >
        Subscribe
      </Button>

    </div>
  );
}

export default SubscribeNewsletter;
