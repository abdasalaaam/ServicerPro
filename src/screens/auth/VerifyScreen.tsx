import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyScreen() {
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Auto-focus the input when screen mounts
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    },200); // Small delay to ensure smooth transition

    return () => clearTimeout(focusTimeout);
  }, []);

  const handleVerify = () => {
    try {
      // Simulate verification check
      if (code !== '123456') { // Example verification
        setError('Incorrect verification code. Please try again.');
        return;
      }
      setError('');
      router.replace('/(main)/schedule');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsResending(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <TouchableOpacity
        onPress={handleBack}
        style={styles.backButton}
      >
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color={theme.text}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.text }]}>
            Verify your number
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Enter the 6-digit code we sent to your phone
          </Text>
          
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              {
                backgroundColor: theme.secondary,
                borderColor: error ? theme.accent : theme.textSecondary,
                color: theme.text
              }
            ]}
            value={code}
            onChangeText={(text) => {
              setCode(text);
              if (error) setError('');
            }}
            placeholder="000000"
            placeholderTextColor={theme.textSecondary}
            keyboardType="number-pad"
            maxLength={6}
            multiline={true}
          />

          {error ? (
            <Text style={[styles.errorText, { color: theme.accent }]}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={handleVerify}
          >
            <Text style={[styles.buttonText, { color: theme.primary }]}>
              Verify
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resendButton}
            onPress={handleResendCode}
            disabled={isResending}
          >
            {isResending ? (
              <ActivityIndicator color={theme.textSecondary} />
            ) : (
              <Text style={[styles.resendText, { color: theme.textSecondary }]}>
                Resend verification code
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 120, // This positions the content below the back button
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
}); 