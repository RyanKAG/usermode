import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../Assets/hmmav2.svg";
import { soc } from "../soc";
import axios from "axios";
import { API_URL } from "../config";
const UserModePage = () => {
    const [key, setKey] = useState("KEY")
    useEffect(() => {
        soc.on("experiment", (data) => {
            console.log(data["experiment"].key)
            setKey(data["experiment"].key)
        })
    }, [])

    const handleGetNewKey = async () => {
        const resp = await axios.post(`${API_URL}/key`, {"id": 2})
        console.log(resp)
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="relative w-full h-full flex flex-col items-center bg-hemmaGrad1 text-white" >
                <Logo className="w-56 md:w-3/12" />
                <div className="-50 flex flex-col w-full h-full md:w-3/4 lg:max-w-5xl md:min-h md:h-fit  rounded-md bg-hemmaGrad2 shadow-xl shadow-gray-800">
                    <h1 className="text-2xl ml-8 mt-4 mb-8">Generate Key</h1>
                    <div className="mx-12 mb-8 p-4 rounded-md bg-hemmaGrad1">{key}</div>
                    <div className="flex flex-col mx-12">
                        <label className="py-4 font-bold">Visibility: 0.8</label>
                        <label className="py-4 font-bold">QBER: 0.3</label>
                    </div>
                    <button onClick={handleGetNewKey} className="fixed bottom-0 md:hidden w-full bg-hemmaAlt text-white py-4">
                        Generate
                    </button>

                    <button onClick={handleGetNewKey} className="transition duration-150 ease-out hover:shadow-xl mx-12 mb-6 invisible md:visible rounded-md bg-hemmaAlt text-white py-4">
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserModePage;