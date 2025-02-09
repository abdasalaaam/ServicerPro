import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { ASSETS } from '../../constants/paths';
import { useTheme } from '../../theme/ThemeContext';

export default function PhoneAuthScreen() {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = useCallback((text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format the number as (555)-555-5555
    let formatted = '';
    if (cleaned.length > 0) {
      formatted += '(' + cleaned.substring(0, 3);
      if (cleaned.length > 3) {
        formatted += ') ' + cleaned.substring(3, 6);
        if (cleaned.length > 6) {
          formatted += '-' + cleaned.substring(6, 10);
        }
      }
    }
    return formatted;
  }, []);

  const handleVerification = () => {
    // Here we'll add the verification logic later
    router.push('verify' as any);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={ASSETS.LOGO}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.text }]}>
          Enter your phone number
        </Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.secondary,
            borderColor: theme.textSecondary,
            color: theme.text
          }]}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
          placeholder="(555) 555-5555"
          placeholderTextColor={theme.textSecondary}
          keyboardType="phone-pad"
          maxLength={14}
        />
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.accent }]}
          onPress={handleVerification}
        >
          <Text style={[styles.buttonText, { color: theme.primary }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 60,
  },
  logo: {
    width: 280,
    height: 140,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 