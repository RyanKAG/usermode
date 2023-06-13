import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../Assets/hmmav2.svg";
import { soc } from "../soc";
import axios from "axios";
import { FaFileDownload } from "react-icons/fa";
import { API_URL } from "../config";
import { AiOutlineLoading } from "react-icons/ai"
const UserModePage = () => {
    const [key, setKey] = useState("5EE6F088E8FDB558C7AEBF006154D726E039D0CA090D90A4020DD41D58BAE04B")
    const [isKeyLoading, setIsKeyLoading] = useState(false)
    const [isInitializingLoading, setIsInitializaingLoading] = useState(false)
    const [isInited, setIsInited] = useState(true)

    useEffect(() => {
        soc.on("experiment", (data) => {
            console.log(data["experiment"].key)
            setKey(data["experiment"].key)
        })
    }, [])

    const handleGetNewKey = async () => {
        setIsKeyLoading(true)
        const resp = await axios.post(`${API_URL}/key`, { "id": 2 })
        setIsKeyLoading(false)
        console.log(resp)
    }

    const exportUserInfo = (userInfo) => {
        const fileData = `${key}`
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "Key.txt";
        link.href = url;
        link.click();
    }
    const formatKey = (key) => {
        if (!key || key === "")
            return ""
        console.log("key");
        console.log(key);
        let formattedKey = ""
        for (let i = 0; i < key.length - 1; i++) {
            if ((i + 1) % 2 === 0)
                formattedKey += key[i] + key[i + 1] + " "
        }
        console.log(formattedKey)
        return formattedKey
    }

    const initializationStatusStyle = () => {
        const baseStyle = " mr-12 mt-4 mb-8  p-2 rounded-md"
        if (isInitializingLoading)
            return baseStyle + " bg-orange-500"
        else if (isInited)
            return baseStyle + " bg-green-500"
        else {
            console.log("isInited")
            return baseStyle + " bg-hemmaGrad1"}
    }
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="relative w-full h-full flex flex-col items-center bg-hemmaGrad1 text-white" >
                <Logo className="w-56 md:w-3/12" />
                <div className="-50 flex flex-col w-full h-full md:w-3/4 lg:max-w-5xl md:min-h md:h-fit  rounded-md bg-hemmaGrad2 shadow-xl shadow-gray-800">
                <label className="text-2xl text-center mt-4">Bob</label>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl ml-8 mt-4 mb-8">Generate Key</h1>
                        <div className={initializationStatusStyle()}>Initialization Status</div>
                    </div>
                    <div  className="relative mx-12 mb-8 p-4 h-14  rounded-md bg-hemmaGrad1">
                        {formatKey(key)}
                        {/* <div className="absolute flex flex-col justify-center items-center shadow-md shadow-black right-3 top-3 bg-primary w-8 h-8 rounded-sm cursor-pointer">
                            <FaFileDownload size={24} className="cursor-pointer " />
                        </div> */}
                    </div>
                    <div className="flex flex-col mx-12">
                        <label className="py-4 font-bold">Visibility: {!key || key === "" ? "0.00%" : "80.00%"}</label>
                        <label className="py-4 font-bold">QBER: {!key || key === "" ? "0.00%" : "2.00%"}</label>
                    </div>
                    <button onClick={handleGetNewKey} className="fixed bottom-0 md:hidden w-full bg-hemmaAlt text-white py-4">
                        Generate
                    </button>

                    <div className="flex flex-row ">
                        <button onClick={() => setIsInitializaingLoading(true)} className="transition w-full duration-150 ease-out hover:shadow-xl mr-4 ml-12 mb-6 invisible md:visible rounded-md bg-primary text-white py-4">
                            {isInitializingLoading ?
                                <AiOutlineLoading className="animate-spin m-auto" size={24} /> : "Initialization"}
                        </button>
                        <button onClick={handleGetNewKey} className={`transition w-full duration-150 ease-out hover:shadow-xl ml-4 mr-12 mb-6 invisible md:visible rounded-md ${ isInited ? "bg-hemmaAlt" : "bg-hemmaGrad1"} text-white py-4`}>
                            {!isKeyLoading ? "Generate" : <AiOutlineLoading className="animate-spin m-auto" size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModePage;