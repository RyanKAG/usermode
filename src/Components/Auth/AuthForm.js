import { FC, useState, useEffect } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import {
  BsPersonFill,
  BsFillKeyFill,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";

import Button from "../Shared/Button";
import { useNavigate } from "react-router-dom";
// import AuthFeedbackBox from "../Shared/AuthFeedbackBox";
import {ReactComponent as Logo} from "../../Assets/pattern.svg";
const AuthForm = () => {
  const [userName, setUserName] = useState("ryan");
  const [password, setPassword] = useState("test123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempt, setAttempt] = useState("idle");
  const Navigate = useNavigate();
  const submitButtonIsDisabled =
    !password ||
    password.length < 7 ||
    password === "password" ||
    !userName ||
    userName.length < 4 ||
    userName === "username" ||
    loading;


  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Navigate("/usermode");
    }, 1500);
  };

  const handleRetry = () => {
    setAttempt("idle")
  };

  useEffect(() => {
    const handleEnterKeyDown = (e) => {
      if (e.key === "Enter" && !submitButtonIsDisabled) handleLogin();
    };
    document.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyDown);
    };
  });

  return (
    <div className="relative h-screen w-full md:w-6/12 md:h-3/6 md:max-w-2xl  p-16 py-20 bg-sidebarBg rounded-xl shadow-xl w">
      {/* <Logo object className="absolute top-0 right-0 opacity-[0.04]" /> */}
      <div className="w-11/12 flex flex-col justify-center items-center text-center mb-8 gap-3">
        <div className="relative w-full">
          <BsPersonFill className="text-primary text-3xl absolute top-3 left-3 font-primary z-10" />
          <input
            className={`w-full p-3 pl-14 rounded border bg-glass focus:outline-none focus:ring-2 focus:border-transparent ${attempt === "failed"
                ? "border-danger focus:ring-danger"
                : "border-primary focus:ring-primary"
              }`}
            type="text"
            value={userName}
            onFocus={() => {
              handleRetry();
              if (userName === "username") setUserName("");
            }}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="relative w-full">
          <BsFillKeyFill className="text-primary text-3xl absolute top-3 left-3 font-primary z-10" />
          <input
            className={`w-full p-3 pl-14 rounded border bg-glass focus:outline-none focus:ring-2 focus:border-transparent ${attempt === "failed"
                ? "border-danger focus:ring-danger"
                : "border-primary focus:ring-primary"
              }`}
            type={showPassword ? "text" : "password"}
            value={password}
            onFocus={() => {
              handleRetry();
              if (password === "password") setPassword("");
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {showPassword ? (
            <BsFillEyeSlashFill
              className="text-primary text-3xl absolute top-3 right-3 font-primary cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <BsFillEyeFill
              className="text-primary text-3xl absolute top-3 right-3 font-primary cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>
      <div className="w-11/12">
        <Button
          content={loading ? <LoadingSpinner /> : "Authenticate"}
          isDisabled={submitButtonIsDisabled ? true : false}
          onClickHandler={handleLogin}
        />
        {/* <AuthFeedbackBox
          feedback={`Incorrect username or password for ${
            type === OperatorType.ALICE ? "alice" : "bob"
          }.`}
        /> */}
      </div>
    </div>
  );
};

export default AuthForm;
