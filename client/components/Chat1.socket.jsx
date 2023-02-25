import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const Chat1 = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit('send_message', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{ flex: 1 }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default Chat1;
