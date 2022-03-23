import UserForm from "./UserForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const signup = (email, password) => {
  let status = true;
  return fetch("/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        status = false;
      }
      return res;
    })
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      if (status) {
        return info;
      }
      throw info;
    });
};

const Signup = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (email, password) => {
    setError(null);
    setLoading(true);
    signup(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {error ? <p>{error?.message ?? "unknown error"}</p> : null}
      <UserForm
        onSubmit={handleSignup}
        loading={loading}
        title="Registration"
      />
    </>
  );
};

export default Signup;
