/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import pusher from './Pusher';
import { Pusher, PusherEvent } from '@pusher/pusher-websocket-react-native';


function App(): React.JSX.Element {
  const [messages, setMessages] = useState([]);

  const pusher = Pusher.getInstance();

  // Khởi tạo và kết nối Pusher
  async function initializePusher() {
    try {
      await pusher.init({
        apiKey: 'a879d4d4cfc48cfc026b',
        cluster: 'ap1',
      });

      await pusher.connect();
      await pusher.subscribe({
        channelName: 'chat-message',
        onEvent: handlePusherEvent,
      });
    } catch (error) {
      console.error('Error initializing Pusher:', error);
    }
  }

  // Gọi hàm khởi tạo Pusher
  useEffect(() => {
    initializePusher();

    // Cleanup function
    return () => {
      pusher.disconnect();
    };
  }, []);

  // Xử lý sự kiện từ Pusher
  const handlePusherEvent = (event: PusherEvent) => {
    const message = JSON.parse(event.data);
    setMessages(message.message);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Edit App.tsx to change this
          screen and then come back to see your edits.</Text>
        {messages.map((item, index) =>
          (<Text key={item._id}>{item.content}</Text>)
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
