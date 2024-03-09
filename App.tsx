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
import pusher from './Pusher';


function App(): React.JSX.Element {
  const [text, setText] = useState([])

  useEffect(() => {
    const channel = pusher.subscribe("chat-message");

    channel.bind("sent-message", function (data: any) {
      if (data && data.message) {
        setText(data.message);
      }
    });

    return () => {
      channel.unbind("sent-message");
      pusher.unsubscribe("chat-message");
    };
  }, [text]);
  console.log(text);
  return (
    <SafeAreaView>
      <View>
        <Text>Edit App.tsx to change this
          screen and then come back to see your edits.</Text>
        {text.map((item, index) =>
          (<Text key={item._id}>{item.content}</Text>)
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
