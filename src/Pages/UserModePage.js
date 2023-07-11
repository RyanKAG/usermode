import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../Assets/hmmav2.svg";
import { soc } from "../soc";
import axios from "axios";
import { FaFileDownload } from "react-icons/fa";
import { API_URL } from "../config";
import { AiOutlineLoading } from "react-icons/ai";
const UserModePage = () => {
  const [key, setKey] = useState(
    ""
  );
  const [isKeyLoading, setIsKeyLoading] = useState(false);
  const [isInitializingLoading, setIsInitializaingLoading] = useState(false);
  const [isInited, setIsInited] = useState(true);
  const [isVisibilityLogsOpen, setIsVisibilityLogsOpen] = useState(false);

  useEffect(() => {
    soc.on("experiment", (data) => {
      console.log("i ran once");
      setKey(data["experiment"].key);
      exportKey();
    });
  }, []);

  const handleGetNewKey = async () => {
    setIsKeyLoading(true);
    const resp = await axios.post(`${API_URL}/key`, { id: 2 });
    setIsKeyLoading(false);
    // console.log(resp);
  };

  const exportKey = () => {
    const fileData = `${key}`;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    console.log("exporting")
    link.download = "Key.txt";
    link.href = url;
    link.click();
  };
  const formatKey = (key) => {
    if (!key || key === "") return "";
    // console.log("key");
    // console.log(key);
    let formattedKey = "";
    for (let i = 0; i < key.length - 1; i++) {
      if ((i + 1) % 2 === 0) formattedKey += key[i] + key[i + 1] + " ";
    }
    // console.log(formattedKey);
    return formattedKey;
  };

  const initializationStatusStyle = () => {
    const baseStyle = " mr-12 mt-4 mb-8  p-2 rounded-md";
    if (isInitializingLoading) return baseStyle + " bg-orange-500";
    else if (isInited) return baseStyle + " bg-green-500";
    else {
      console.log("isInited");
      return baseStyle + " bg-hemmaGrad1";
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-full h-full flex flex-col items-center bg-hemmaGrad1 text-white">
        <Logo className="w-56 md:w-3/12" />
        <div className="-50 flex flex-col w-full h-full md:w-3/4 lg:max-w-5xl md:min-h md:h-fit  rounded-md bg-hemmaGrad2 shadow-xl shadow-gray-800">
          <label className="text-2xl text-center mt-4">{JSON.parse(localStorage.getItem("user")).type.toUpperCase()}</label>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl ml-8 mt-4 mb-8">Generate Key</h1>
            <div className={initializationStatusStyle()}>
              Initialization Status
            </div>
          </div>
          <div className="relative mx-12 mb-8 p-4 h-20  rounded-md bg-hemmaGrad1">
            {formatKey(key).toUpperCase()}
            {/* <div className="absolute flex flex-col justify-center items-center shadow-md shadow-black right-3 top-3 bg-primary w-8 h-8 rounded-sm cursor-pointer">
                            <FaFileDownload size={24} className="cursor-pointer " />
                        </div> */}
          </div>
          <div className="flex flex-col mx-12">
            <div className="py-4  flex flex-row justify-between items-center">
              <label className="ml-4 font-semibold">
                Visibility: {!key || key === "" ? "0.00%" : "80.00%"}
              </label>
              {/* <button className="mr-4 p-2 rounded-md border-2" onClick={() => setIsVisibilityLogsOpen(!isVisibilityLogsOpen)}>Visibility Logs</button>

              <div className={`absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 ${isVisibilityLogsOpen ? "" : "hidden"}`}>
                <div className=" w-screen max-w-md max-h-32 flex-auto overflow-scroll rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className=" p-2  text-red-500"> <label>22</label></div>
                    <div className=" p-2  text-red-500"> <label>43</label></div>
                    <div className=" p-2  text-red-500"> <label>21</label></div>
                    <div className=" p-2  text-red-500"> <label>44</label></div>
                    <div className=" p-2  text-red-500"> <label>11</label></div>
                </div>
              </div> */}
            </div>
            <div className="mb-8 font-semibold items-center">
              <label className="ml-4 ">
                QBER: {!key || key === "" ? "0.00%" : "2.00%"}
              </label>
            </div>
          </div>
          <button
            onClick={handleGetNewKey}
            className="fixed bottom-0 md:hidden w-full bg-hemmaAlt text-white py-4"
          >
            Generate
          </button>

          <div className="flex flex-row ">
            <button
              onClick={() => setIsInitializaingLoading(true)}
              className="transition w-full duration-150 ease-out hover:shadow-xl mr-4 ml-12 mb-6 invisible md:visible rounded-md bg-primary text-white py-4"
            >
              {isInitializingLoading ? (
                <AiOutlineLoading className="animate-spin m-auto" size={24} />
              ) : (
                "Initialization"
              )}
            </button>
            <button
              onClick={handleGetNewKey}
              className={`transition w-full duration-150 ease-out hover:shadow-xl ml-4 mr-12 mb-6 invisible md:visible rounded-md ${
                isInited ? "bg-hemmaAlt" : "bg-hemmaGrad1"
              } text-white py-4`}
            >
              {!isKeyLoading ? (
                "Generate"
              ) : (
                <AiOutlineLoading className="animate-spin m-auto" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModePage;
