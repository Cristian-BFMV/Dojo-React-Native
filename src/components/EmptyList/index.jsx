import { View, Text, Image, StyleSheet } from 'react-native';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Image
        style={styles.emptyListImage}
        source={require('../../../assets/Empty.png')}
      />
      <Text style={styles.emptyListText}>No tienes tareas creadas</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyListImage: {
    width: 200,
    height: 200,
  },
  emptyListText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#676a73',
  },
});
