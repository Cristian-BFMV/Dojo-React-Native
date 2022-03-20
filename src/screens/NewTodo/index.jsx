import { useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { TodoContext } from '../../context';

const NewTodoScreen = () => {
  const { addTodo } = useContext(TodoContext);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      todoTitle: '',
    },
  });

  const onSubmit = useCallback(data => {
    addTodo(data.todoTitle);
    navigation.navigate('HomeScreen');
    reset();
  }, []);

  return (
    <View style={styles.newTodoContainer}>
      <Text style={styles.newTodoTitle}>Nueva tarea</Text>
      <Text style={styles.newTodoLabel}>Titulo de la tarea</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.todoTitle ? true : false}
          />
        )}
        name="todoTitle"
      />
      {errors.todoTitle && (
        <Text style={styles.newTodoErrorText}>Este campo es requerido.</Text>
      )}
      <Button buttonText="Crear tarea" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default NewTodoScreen;

const styles = StyleSheet.create({
  newTodoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  newTodoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#676a73',
    textAlign: 'center',
    marginBottom: 20,
  },
  newTodoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#676a73',
    marginBottom: 10,
  },
  newTodoErrorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff3e3e',
  },
});
