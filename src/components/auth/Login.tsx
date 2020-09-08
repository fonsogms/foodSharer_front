import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { setToken } from "../../token.info";
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
        process.env.REACT_APP_DOMAIN + "/api/auth/signIn",
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
        setErrorMessage([data.message]);
      }
      /*   const token: string = await axios.post(
        process.env.REACT_APP_DOMAIN + "/api/auth/signIn",
        signIn
      ); */
    } catch (error) {
      console.log(error, "here");
      console.log(error.response.data, "this is the error");
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div>
      <h1>Please Log in</h1>
      <form action="">
        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={loginDto.username}
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={loginDto.password}
        />
        <div>
          <button
            onClick={(e) => {
              signIn(e, loginDto);
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div>
        {console.log(errorMessage)}
        {errorMessage[0] &&
          errorMessage.map((elem, index) => {
            return <h2 key={index}>{elem}</h2>;
          })}
      </div>
    </div>
  );
};

export default Login;
