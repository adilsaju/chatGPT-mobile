import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';


import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import { v4 as uuidv4 } from 'uuid';
import { Chat, Channel, ChannelList, MessageInput } from '@flyerhq/react-native-chat-ui';



const Chat1 = () => {


  const [messages, setMessages] = useState([])
  const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

  const addMessage = (message) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }



  return (
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Chat1;
