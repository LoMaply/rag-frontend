import { useContext, useState } from "react";
import axiosinstance from "../utils/AxiosInstance";
import { UploadedContext } from "../context/UploadedContext";

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SingleFileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { getUploadedFiles } = useContext(UploadedContext) as {getUploadedFiles:() => Promise<void>}


  const handleClose = () => setOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");
  
      const formData = new FormData();
      formData.append("file", file);
      setIsProcessing(true);

      try {
        const response = await axiosinstance.post("/upload", formData)
        console.log(response.data)
        setOpen(true)
      } catch(error) {
        console.log(error)
      } finally {
        getUploadedFiles()
        setIsProcessing(false)
        setFile(null)
      }

    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        sx={{maxWidth: '20%', minWidth: '185px'}}
        startIcon={<CloudUploadIcon />}
      >
        Choose file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>

      {file && (
        <ul>
          <li>Name: {file.name}</li>
          <li>Type: {file.type}</li>
          <li>Size: {file.size} bytes</li>
        </ul>
      )}

      {file && <Button onClick={handleUpload} disabled={isProcessing} variant="outlined" size="small" sx={{maxWidth: '15%'}}>Upload File</Button>}
      {isProcessing && <CircularProgress  sx={{ mt: 2 }}/>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload complete
          </Typography>
        </Box>
      </Modal>
    </>
  );
};