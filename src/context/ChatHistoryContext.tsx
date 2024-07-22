import { createContext, useState } from 'react';
import { Message } from '../utils/Types';

// Create a new context
export const ChatHistoryContext = createContext({});

// This is our provider that will feed the context to components
export const ChatHistoryProvider = ({children}:{children:React.ReactNode}) => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  // Provide the context to children components
  return (
    <ChatHistoryContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};