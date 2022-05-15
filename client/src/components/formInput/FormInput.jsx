import { useState } from "react";
import "./formInput.css";
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`


const Label = styled.h1`
  font-size: 12px;
  color: gray;
`

const Span = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
  display: none;
`
const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <Span>{errorMessage}</Span>
    </Container>
  );
};

export default FormInput;
