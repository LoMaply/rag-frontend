import { useContext } from "react";
import axiosinstance from "../utils/AxiosInstance"
import { UploadedContext } from "../context/UploadedContext";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ClearDB() {
  const { getUploadedFiles } = useContext(UploadedContext) as { getUploadedFiles:() => Promise<void>}

  const handleSubmit = async () => {
    try {
      const response = await axiosinstance.delete("/purge")
      console.log(response)
      getUploadedFiles()
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <Button 
      onClick={handleSubmit}
      sx={{maxWidth: '20%', minWidth: '185px', mt: 2, mb: 2}}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
    >
      Delete all data
    </Button>
  );
};