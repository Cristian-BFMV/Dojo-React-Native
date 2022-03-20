import { useContext } from 'react';
import { FlatList } from 'react-native';
import TodoCard from '../TodoCard';
import { TodoContext } from '../../context';
import EmptyList from '../EmptyList';

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      {todos.length === 0 ? (
        <EmptyList />
      ) : (
        <FlatList
          data={todos}
          renderItem={({ item }) => {
            return <TodoCard todoTitle={item.todoTitle} todoId={item.id} />;
          }}
          keyExtractor={({ id }) => id}
        />
      )}
    </>
  );
};

export default TodoList;
