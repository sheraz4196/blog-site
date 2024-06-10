import { createContext, useState } from "react";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [currentBlog, setCurrentBlog] = useState("");
  return (
    <AppContext.Provider value={{ currentBlog, setCurrentBlog }}>
      {children}
    </AppContext.Provider>
  );
};
