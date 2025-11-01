import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { LestarHeader } from '@/components/chat/LestarHeader';
import { LestarChatBubble } from '@/components/chat/LestarChatBubble';
import { LestarChatInput } from '@/components/chat/LestarChatInput';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Halo! Saya Lestar Bot. Ada yang bisa saya bantu?',
    isBot: true,
    timestamp: new Date(),
  },
  {
    id: '2',
    text: 'Bagaimana cara melaporkan sampah?',
    isBot: false,
    timestamp: new Date(),
  },
  {
    id: '3',
    text: 'Untuk melaporkan sampah, Anda bisa klik tombol "Laporkan" di menu bawah, lalu ambil foto sampah dan isi detail lokasi.',
    isBot: true,
    timestamp: new Date(),
  },
  {
    id: '4',
    text: 'Terima kasih!',
    isBot: false,
    timestamp: new Date(),
  },
];

export default function LestarChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Terima kasih atas pesan Anda! Saya akan membantu Anda.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <LestarHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item, index }) => (
            <LestarChatBubble
              message={item.text}
              isBot={item.isBot}
              index={index}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputContainer}>
          <LestarChatInput
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
});