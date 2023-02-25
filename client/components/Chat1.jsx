import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';

const CHAT_ENDPOINT = 'http://localhost:3000/messages';

const Chat1 = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("User");


  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(CHAT_ENDPOINT);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSend = async () => {
    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, sender: sender }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Message sent successfully
      console.log('Message sent successfully!');
      
      // Add the new message to the messages array
      setMessages([...messages, { id: Date.now(), message: message, sender: sender }]);
      
      // Clear the message input
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.message}>
        <Text style={styles.sender} >{item.sender}</Text>
        <Text>{item.message}</Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={handleSend}
        />
        <Button
          title="Send"
          onPress={handleSend}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  message: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sender: {
    // backgroundColor: "red"
    color: "grey"
  }
});

export default Chat1;
