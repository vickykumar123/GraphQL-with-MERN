import {useRef, useState} from "react";
import {login, signup} from "../graphQL/query";
import "./Auth.css";
import {useAppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const emailEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const context = useAppContext();
  const navigate = useNavigate();
  function switchModeHandler() {
    setIsLogin((login) => !login);
  }
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = emailEl.current?.value;
    const password = passwordEl.current?.value;

    let authQuery;
    if (isLogin) {
      authQuery = login(email!, password!);
    }
    if (!isLogin) {
      authQuery = signup(email!, password!);
    }
    try {
      const sendData = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authQuery),
      });

      const responseData = await sendData.json();
      context?.loggedUser(
        responseData.data.login.email,
        responseData.data.login.token,
        responseData.data.login.userId
      );
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <h1>{isLogin ? "Login" : "Sign-up"}</h1>
      <div className="form-control">
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
}
