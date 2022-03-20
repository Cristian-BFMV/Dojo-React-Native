import React from 'react';
import { ActivityIndicator, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default function ({ buttonText, isLoading = false, onPress }) {
  return (
    <React.Fragment>
      {isLoading ? (
        <ActivityIndicator size="large" color="#33691E" />
      ) : (
        <TouchableHighlight
          style={styles.button}
          onPress={onPress}
          underlayColor="#f6f6f6"
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableHighlight>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#50e3a4',
    borderWidth: 2,
    marginVertical: 6,
  },
  buttonText: {
    color: '#50e3a4',
    fontSize: 18,
  },
});
