import { useState } from 'react';
import { UploadedProvider } from './context/UploadedContext';
import { ChatHistoryProvider } from './context/ChatHistoryContext';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ChatPage from './component-pages/ChatPage';
import UploadPage from './component-pages/UploadPage';

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <UploadedProvider>
      <ChatHistoryProvider>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Chat" value="1" />
                <Tab label="Manage files" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ChatPage />
            </TabPanel>
            <TabPanel value="2">
              <UploadPage/>
            </TabPanel>
          </TabContext>
        </Box>
      </ChatHistoryProvider>
    </UploadedProvider>
  );
}

export default App
