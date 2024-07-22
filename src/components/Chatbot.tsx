import { useContext, useState } from 'react';
import axiosinstance from '../utils/AxiosInstance';
import { Message } from '../utils/Types';
import Typography from '@mui/material/Typography';
import '../css/Chatbot.css';
import { ChatHistoryContext } from '../context/ChatHistoryContext';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const { messages, setMessages } = useContext(ChatHistoryContext) as {messages: Array<Message>, setMessages: (value: React.SetStateAction<Message[]>) => void}

  const chatWithLLM = async (userInput: String) => {
    try {
      console.log('Sending request')
      const response = await axiosinstance.post("/query", {query: userInput});
      console.log("Received response: " + response.data.result)
      return response.data.result;
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await chatWithLLM(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <Typography key={index} variant="body1" className={`message ${message.user ? 'user-message' : 'ai-message'}`} style={{ whiteSpace: "pre-wrap" }}>
            {message.text}
          </Typography>
        ))}
      </div>
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};