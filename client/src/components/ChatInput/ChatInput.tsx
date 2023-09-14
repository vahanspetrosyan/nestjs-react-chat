import React, {useState} from 'react';
import styles from './ChatInput.module.scss';

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const handleSendMessage = () => {
        sendMessage(currentMessage);
        setCurrentMessage('');
    }
    return (
        <>
            <input
                type="text"
                value={currentMessage}
                placeholder="Type a message"
                onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                    event.key === "Enter" && handleSendMessage();
                }}
                className={styles.input}
            />

            <button
                onClick={handleSendMessage}
                className={styles.button}
            >
                send
            </button>
        </>
    );
};

export default ChatInput;
