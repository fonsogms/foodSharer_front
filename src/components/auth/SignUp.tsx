import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { setToken } from "../../token.info";
import {
  StyledDiv,
  StyledError,
  StyledForm,
  StyledLoginDiv,
  StyledInputDiv,
  StyledInput,
  StyledButton,
} from "./Login/Styles";

const SingUp = (props) => {
  interface RegisterDto {
    username: string;
    password: string;
  }

  const [registerDto, setRegisterDto] = useState<RegisterDto>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage]: [string[], Function] = useState([""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRegisterDto({ ...registerDto, [name]: value });
  };
  const signUp = async (
    e: SyntheticEvent,
    signUp: RegisterDto
  ): Promise<void> => {
    e.preventDefault();

    try {
      const {
        data: { token },
      } = await axios.post<{
        token: string;
      }>((process.env.REACT_APP_DOMAIN || "") + "/api/auth/signUp", signUp);
      props.setToken(token);
      props.history.push("/home");
    } catch (error) {
      console.log(error.response.data.message);
      let newErrorMessage: string[] = [""];
      if (typeof error.response.data.message == "string") {
        newErrorMessage[0] = error.response.data.message;
      } else {
        newErrorMessage = error.response.data.message;
      }
      setErrorMessage(newErrorMessage);
    }
  };
  // console.log(errorMessage);
  return (
    <StyledDiv>
      <StyledLoginDiv>
        <h1>Please Sign Up</h1>
        <StyledForm action="">
          <div>
            <h3>Username</h3>
            <StyledInputDiv>
              <StyledInput
                type="text"
                onChange={handleChange}
                name="username"
                value={registerDto.username}
              />
            </StyledInputDiv>
          </div>
          <div>
            <h3>Password</h3>
            <StyledInputDiv>
              <StyledInput
                type="text"
                onChange={handleChange}
                name="username"
                value={registerDto.username}
              />
            </StyledInputDiv>
          </div>

          <div>
            <StyledButton
              onClick={(e) => {
                signUp(e, registerDto);
              }}
            >
              Register
            </StyledButton>
          </div>
        </StyledForm>
      </StyledLoginDiv>

      <StyledError>
        {errorMessage[0] &&
          errorMessage.map((elem, index) => {
            return <h2 key={index}>{elem}</h2>;
          })}
      </StyledError>
    </StyledDiv>
  );
};

export default SingUp;
