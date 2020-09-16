import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("login");
  const userName = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  // const email = useInput("");
  const email = useInput("lalala@gmail.com");

  const requestSecret = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { _requestSecret } = data;
      if (!_requestSecret) {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => setAction("signUp"), 3000);
      }
    },
    variables: { email: email.value },
  });

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      userName: userName.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === "singUp") {
      if (
        email.value !== "" &&
        userName.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        console.log("createAccount");
        createAccount();
      } else {
        toast.error("All field are required!!");
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      setAction={setAction}
      onSubmit={onSubmit}
    />
  );
};
