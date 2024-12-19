import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { askChatGPT } from '../chatAPI';

function ChatComponent() {
    const location = useLocation();
    const predefinedKnowledge = location.state?.predefinedKnowledge || [];
    const [conversation, setConversation] = useState(predefinedKnowledge);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = { role: 'user', content: prompt };
        const updatedConversation = [...conversation, newMessage];
        const reply = await askChatGPT(updatedConversation);
        const botMessage = { role: 'assistant', content: reply };
        setConversation([...updatedConversation, botMessage]);
        setResponse(reply);
        setPrompt('');
    };

    return (
        <div>
            <h1>Chat with GPT</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask a question..."
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Conversation:</h2>
                <div>
                    {conversation
                        .filter((message) => message.role !== 'system')
                        .map((msg, index) => (
                            <p key={index}>
                                <strong>{msg.role === 'user' ? 'You' : 'ChatGPT'}:</strong> {msg.content}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
