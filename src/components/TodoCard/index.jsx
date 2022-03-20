import { useState, useContext, useCallback } from 'react';
import { View, Text, CheckBox, TouchableHighlight, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TodoContext } from '../../context';

const TodoCard = ({ todoTitle, todoId }) => {
  const [isSelected, setSelection] = useState(false);
  const { deleteTodo } = useContext(TodoContext);

  const handleDelete = useCallback(() => {
    deleteTodo(todoId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.todoCard}>
        <CheckBox value={isSelected} onValueChange={setSelection} />
        <Text style={[styles.todoCardText, isSelected && styles.todoCardCompleted]}>
          {todoTitle}
        </Text>
      </View>
      <View style={styles.todoCardIconsContainer}>
        <TouchableHighlight onPress={handleDelete}>
          <AntDesign
            style={styles.todoCardIcon}
            name="delete"
            size={24}
            color="#ff4040"
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCardText: {
    fontSize: 18,
    marginLeft: 10,
  },
  todoCardCompleted: {
    textDecorationLine: 'line-through',
    color: '#555555',
  },
  todoCardIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCardIcon: {
    marginHorizontal: 5,
  },
});
