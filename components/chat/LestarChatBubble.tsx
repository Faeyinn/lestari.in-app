import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface LestarChatBubbleProps {
  message: string;
  isBot: boolean;
  index: number;
}

export const LestarChatBubble: React.FC<LestarChatBubbleProps> = ({
  message,
  isBot,
  index,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(400).springify()}
      style={[styles.container, !isBot && styles.userContainer]}
    >
      {isBot && (
        <View style={styles.botAvatarContainer}>
          <View style={styles.botAvatar}>
            <Text style={styles.avatarEmoji}>🌱</Text>
          </View>
        </View>
      )}

      <View style={styles.bubbleWrapper}>
        <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
          <Text style={[styles.messageText, isBot ? styles.botText : styles.userText]}>
            {message}
          </Text>
        </View>
        
        <View
          style={[
            styles.secondaryBubble,
            isBot ? styles.botSecondaryBubble : styles.userSecondaryBubble,
          ]}
        />
      </View>

      {!isBot && (
        <View style={styles.userAvatarContainer}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>👤</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botAvatarContainer: {
    marginRight: 8,
    marginTop: 4,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2D5F4F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 16,
  },
  userAvatarContainer: {
    marginLeft: 8,
    marginTop: 4,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 16,
  },
  bubbleWrapper: {
    flex: 1,
    maxWidth: '75%',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  botBubble: {
    backgroundColor: '#4A9D6F',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 4,
    alignSelf: 'flex-end',
  },
  secondaryBubble: {
    height: 28,
    marginTop: 4,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  botSecondaryBubble: {
    backgroundColor: '#D4F1E3',
  },
  userSecondaryBubble: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: '#FFFFFF',
    fontWeight: '400',
  },
  userText: {
    color: '#1F2937',
    fontWeight: '400',
  },
});