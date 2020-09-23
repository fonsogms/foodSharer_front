import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import {
  StyledDiv,
  StyledInputDiv,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledLoginDiv,
} from "./Styles";

const Login = (props) => {
  interface LoginDto {
    username: string;
    password: string;
  }

  const [loginDto, setLoginDto] = useState<LoginDto>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage]: [string[], Function] = useState([""]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginDto({ ...loginDto, [name]: value });
  };
  const signIn = async (e: SyntheticEvent, signIn: LoginDto): Promise<void> => {
    e.preventDefault();
    try {
      const requestBody = await JSON.stringify(signIn);
      const body = await fetch(
        (process.env.REACT_APP_DOMAIN || "") + "/api/auth/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: requestBody,
        }
      );

      const data = await body.json();
      if (data.token) {
        props.setToken(data.token);
        props.history.push("/home");
      } else {
        console.log(data);
        setErrorMessage([...data.message]);
      }
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
  return (
    <StyledDiv>
      <StyledLoginDiv>
        <h1>Welcome to foodsharer</h1>{" "}
        <h4>
          The best place to give the food that you dont want and to recieve the
          food that you need.
        </h4>
        <StyledForm action="">
          <div>
            <h3>Username</h3>
            <StyledInputDiv>
              <StyledInput
                type="text"
                onChange={handleChange}
                name="username"
                value={loginDto.username}
              />
            </StyledInputDiv>
          </div>
          <div>
            <h3>Password</h3>

            <StyledInputDiv>
              <StyledInput
                type="password"
                onChange={handleChange}
                name="password"
                value={loginDto.password}
              />
            </StyledInputDiv>
          </div>
          <div>
            <StyledButton
              onClick={(e) => {
                signIn(e, loginDto);
              }}
            >
              Login
            </StyledButton>
            <StyledButton
              onClick={(e) => {
                props.history.push("/signup");
              }}
            >
              SignUp
            </StyledButton>
          </div>
        </StyledForm>
      </StyledLoginDiv>
      <div>
        {console.log(errorMessage)}
        {errorMessage[0] &&
          errorMessage.map((elem, index) => {
            return (
              <div>
                <h2 key={index}>{elem}</h2>
              </div>
            );
          })}
      </div>
    </StyledDiv>
  );
};

export default Login;
