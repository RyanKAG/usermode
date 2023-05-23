import { ReactComponent as Logo } from "../Assets/hmmav2.svg";
import { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading,
} from "react-icons/ai";
export const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-full h-full flex flex-col items-center bg-hemmaGrad1 text-white justify-between md:justify-normal">
        <Logo className="md:w-3/12" />
        <div className="-50 flex flex-col w-full h-2/3 lg:w-6/12 lg:min-h lg:h-fit  rounded-md bg-hemmaGrad2 shadow-xl shadow-gray-800">
          <h1 className="text-2xl ml-8 mt-4 mb-8">Login</h1>
          <input
            alt="username"
            placeholder="Username"
            className="mx-12 mb-8 p-4 rounded-md bg-hemmaGrad1"
          />
          <div className="relative flex flex-row justify-around mb-6">
            <input
              alt="password"
              placeholder="Password"
              type={!showPassword ? "password" : "text"}
              className="mx-12 mb-8 p-4 rounded-md bg-hemmaGrad1 w-full"
            />
            {showPassword ? (
              <AiFillEye
                size={35}
                className="absolute top-3 right-16"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiFillEyeInvisible
                size={35}
                className="absolute top-3 right-16"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <button
          onClick={handleLogin} 
          className="fixed bottom-0 lg:hidden w-full bg-hemmaAlt text-white py-4 select-none">
            {isLoading ? (
              <AiOutlineLoading className="animate-spin m-auto" size={24} />
            ) : (
              "login"
            )}
          </button>

          <button
            onClick={handleLogin}
            onMouseUp={() => {
              console.log("mouse uped");
              setButtonClicked(false);
            }}
            onMouseDown={() => {
              console.log("mouse uped");
              setButtonClicked(true);
            }}
            className={
              "transition duration-70 ease-out mx-12 mb-6 invisible lg:visible rounded-md bg-hemmaAlt text-white py-4 select-none " +
              (buttonClicked ? "shadow-sm " : "hover:shadow-xl ")
            }
          >
            {isLoading ? (
              <AiOutlineLoading className="animate-spin m-auto" size={24} />
            ) : (
              "login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
