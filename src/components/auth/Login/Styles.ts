import styled from "styled-components";
export const StyledDiv = styled.div`
  background-image: url("/mediterranean-cuisine-2378758_1920.jpg");
  height: 100vh;
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledInputDiv = styled.div`
  width: 30vh;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 2px black;
`;
export const StyledInput = styled.input`
  width: 29vh;
  background: white;
  border-radius: 5px;
  border: none;
`;
export const StyledForm = styled.form`
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
`;

export const StyledButton = styled.button`
  margin: 20px;
  width: 15vh;
  background-color: #008cba;
  border-radius: 30px;
  font-size: 20px;
  color: white;
  border: none;
  font-family: "Chewy", cursive;
`;
export const StyledError = styled.div`
  display: flex;
  flex-direction: column;
`;
