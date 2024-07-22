import { createContext, useEffect, useState } from 'react';
import axiosinstance from '../utils/AxiosInstance';

// Create a new context
export const UploadedContext = createContext({});

// This is our provider that will feed the context to components
export const UploadedProvider = ({children}:{children:React.ReactNode}) => {
  const [uploadedList, setUploadedList] = useState<Array<String>>([]);

  useEffect(() => {
    getUploadedFiles()
  }, []);

  const getUploadedFiles = async () => {
    try {
      const response = await axiosinstance.get("/upload")
      console.log(response.data)
      setUploadedList(response.data)
    } catch(error) {
      console.log(error)
    }
  };

  // Provide the context to children components
  return (
    <UploadedContext.Provider value={{ uploadedList, getUploadedFiles }}>
      {children}
    </UploadedContext.Provider>
  );
};