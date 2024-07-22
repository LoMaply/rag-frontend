import { useContext } from "react"
import axiosinstance from "../utils/AxiosInstance"
import { UploadedContext } from "../context/UploadedContext";

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HtmlIcon from '@mui/icons-material/Html';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


export default function UploadedList() {

  const { uploadedList, getUploadedFiles } = useContext(UploadedContext) as {uploadedList:Array<String>, getUploadedFiles:() => Promise<void>}

  const deleteFile = async (name:String) => {
    try {
      const response = await axiosinstance.delete("/delete", {data:{fileName: name}})
      getUploadedFiles()
      console.log(response.data)
    } catch(error) {
      console.log(error)
    }
  };

  const getIcon = (filename:String) => {
    if (filename.endsWith("html")) {
      return <HtmlIcon/>
    } else if (filename.endsWith(".pdf")) {
      return <PictureAsPdfIcon />
    } else {
      return <InsertDriveFileIcon/>
    }
  }

  return (
    <Paper sx={{height: '90%'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ mt: 2, ml: 2 }} variant="h6" component="div">Uploaded Files</Typography>
        <IconButton onClick={getUploadedFiles} sx={{ mr: 2 }}>
          <RefreshIcon />
        </IconButton>
      </div>
      <Demo>
        <List dense={true} sx={{maxHeight: '100%', overflow: 'auto'}}>
          {uploadedList.map((fileName, i) => {
            return(
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton onClick={() => deleteFile(fileName)} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    {getIcon(fileName)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={fileName}/>
              </ListItem>
            )
          })}
        </List>
      </Demo>
    </Paper>
  );
};