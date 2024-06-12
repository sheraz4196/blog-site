// context/CommonDataContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { fetchCommonData } from "@/lib/fetchCommonData";

const CommonDataContext = createContext(null);

export const useCommonData = () => {
  return useContext(CommonDataContext);
};

export const CommonDataProvider = ({ children }) => {
  const [commonData, setCommonData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCommonData();
      setCommonData(data);
    };
    getData();
  }, []);

  return (
    <CommonDataContext.Provider value={commonData}>
      {children}
    </CommonDataContext.Provider>
  );
};
