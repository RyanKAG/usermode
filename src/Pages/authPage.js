import { useState } from "react";
import AuthForm from "../Components/Auth/AuthForm";
export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <div className="relative min-h-screen w-screen flex justify-center items-center bg-gradient-to-l from-hemmaGrad1 to bg-hemmaGrad2">
           <AuthForm/>
        </div>
    );
};