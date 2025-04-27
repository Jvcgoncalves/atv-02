import styled from "styled-components";

const Input = styled.input`
  background-color: #cbd5e1;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 1px 2px #00000090;
  &:focus {
    outline: 2px solid #6b21a8;
  }
`;

export default Input;