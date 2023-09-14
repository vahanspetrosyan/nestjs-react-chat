import React, {useCallback, useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatInput from "../ChatInput/ChatInput";
import {MessageContent} from "./interfaces";
import io from "socket.io-client";
import {SOCKET_URL} from "../../constants/configs";

import cx from 'classnames';
import styles from './ChatRoom.module.scss';

let socket:any;

const ChatRoot: React.FC<ChatRootProps> = ({ username }) => {
    const [messageList, setMessageList] = useState<MessageContent[]>([]);
    useEffect(() => {
        socket = io(SOCKET_URL);
        if (socket) {
            socket.emit('joinChat', username);

            socket.on('messageHistory', (history: MessageContent[]) => {
                setMessageList(history);
            });

            socket.on('newMessage', (newMessage: MessageContent) => {
                setMessageList((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, []);

    const sendMessage = useCallback(async (message: string) => {
        if (message.trim()) {
            await socket.emit('chatMessage', message);
        }
    }, []);

    const formatDate = (timestamp: number) => {
        if (timestamp) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).format(timestamp);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Live Chat</p>
            </div>
            <div className={styles.chatWrapper}>
                <ScrollToBottom className={styles.chat}>
                    {messageList.map((messageContent, i) => {
                        return (
                            <div
                                className={cx(styles.messageWrapper, {
                                    [styles.my]: username === messageContent.username,
                                    [styles.system]: messageContent.username === 'system'
                                })}
                                key={i}
                            >
                                <div className={styles.message}>
                                    <p className={styles.username}>{messageContent.username}</p>
                                    <div className={styles.content}>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <p className={styles.time}>{formatDate(messageContent.timestamp)}</p>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className={styles.footer}>
                <ChatInput sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default ChatRoot;
