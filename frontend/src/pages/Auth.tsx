import {useRef, useState} from "react";
import {login, signup} from "../graphQL/query";
import "./Auth.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const emailEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);

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
      console.log(responseData);
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
