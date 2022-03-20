import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TodoList from '../../components/TodoList';
import Button from '../../components/Button';

const HomeScreen = () => {
  const [date] = useState(new Date());
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.navigate('NewTodoScreen');
  }, []);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <View style={styles.homeHeaderDate}>
          <Text style={styles.homeHeaderDateDay}>
            {date.toLocaleDateString('co-CO', { day: 'numeric' })}
          </Text>
          <View>
            <Text style={styles.homeHeaderDateMonthYear}>
              {date.toLocaleDateString('co-CO', { month: 'long' })}
            </Text>
            <Text style={styles.homeHeaderDateMonthYear}>
              {date.toLocaleDateString('co-CO', { year: 'numeric' })}
            </Text>
          </View>
        </View>
        <Text style={styles.homeHeaderDateMonthYear}>
          {date.toLocaleDateString('co-CO', { weekday: 'long' })}
        </Text>
      </View>
      <View style={styles.homeTodoListHeader}>
        <View>
          <Text style={styles.homeTodoListHeaderText}>Mis tareas</Text>
          <Button buttonText="Nueva tarea" onPress={handlePress} />
        </View>
        <TodoList />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeHeader: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeHeaderDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeHeaderDateDay: {
    marginRight: 10,
    fontSize: 40,
    color: '#676a73',
    fontWeight: 'bold',
  },
  homeHeaderDateMonthYear: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#676a73',
  },
  homeTodoListHeader: {
    padding: 20,
  },
  homeTodoListHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#676a73',
  },
});
