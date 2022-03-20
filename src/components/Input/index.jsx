import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function ({
  value,
  onBlur,
  onChangeText,
  error,
  secureTextEntry = false,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <TextInput
      style={[styles.input, isFocused && styles.focusInput, error && styles.errorInput]}
      onBlur={() => {
        onBlur();
        setIsFocused(false);
      }}
      onChangeText={value => onChangeText(value)}
      value={value}
      onFocus={() => setIsFocused(true)}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: '#a1a1a1',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    height: 40,
  },
  focusInput: {
    borderColor: '#33691E',
  },
  errorInput: {
    borderColor: '#ff3e3e',
  },
  errorMessage: {
    color: '#ff3e3e',
    fontSize: 16,
  },
});
