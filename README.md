# Dojo React Native

En este dojo constuiremos una pequeña aplicación de tareas para demostrar los conceptos básicos de React Native

## Instalación de las herramientas necesarias

### Instalar Node JS

Para seguir este dojo es necesario tener instalado Node JS. La instalación la podemos realizar desde [este link](https://nodejs.org/en/download/)

### Instalar Expo CLI

Otra herramienta necesaria es Expo(para instalar esta herramienta es necesario haber completado previamente el paso anterior). En una consola de nuestro sistema operativo, ejecutaremos el siguiente comando:

```bash
npm install --global expo-cli
```

## Clonación del proeycto de Github

Para clonar el proyecto, ejecutaremos el siguiente comando en una consola:

```bash
git clone https://github.com/Cristian-BFMV/Dojo-React-Native
```

Y nos pasaremos a la rama _template_ con el siguiente comando:

```bash
git checkout template
```

## Instalación de las dependencias del proyecto

Ahora procederemos a instalar las dependencias necesarias para desarrollar la aplicación demostrativa. En la terminal, estando parados en la carpeta root del proyecto, ejecutaremos este comando:

```bash
npm install --save
```

## Desarrollo de la aplicación

Habiendo completado todos los pasos anteriores, ya podremos iniciar con el desarrollo de la aplicación.

### App component

Este componente actua como punto de entrada de nuestra aplicación. Vamos a importar las librerías y componentes necesarios para nuestra aplicación.

```js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './src/screens/Home';
import NewTodoScreen from './src/screens/NewTodo';
import TodoProvider from './src/context';
```

Creamos la instancia del elemento de navegación de nuestra aplicación.

```js
const Tabs = createBottomTabNavigator();
```

Configuremos la navegación de la aplicación.

```js
export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            tabBarIcon: ({ focused }) => (
              <AntDesign name="home" size={20} color={focused ? '#50e3a4' : '#5C5C5C'} />
            ),
            tabBarActiveTintColor: '#50e3a4',
            tabBarInactiveTintColor: '#5C5C5C',
          }}
        />
        <Tabs.Screen
          name="NewTodoScreen"
          component={NewTodoScreen}
          options={{
            title: 'Nueva tarea',
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="tasks"
                size={20}
                color={focused ? '#50e3a4' : '#5C5C5C'}
              />
            ),
            tabBarActiveTintColor: '#50e3a4',
            tabBarInactiveTintColor: '#5C5C5C',
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
```

### Context component de la aplicación

Este componente nos servira con un store global para almacenar una parte del estado de la aplicación. Importemos las librería necesarias para desarrollar este componente.

```js
import { createContext, useState, useCallback } from 'react';
```

Creemos el componente "_context_"

```js
export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
});
```

Configuremos el componente "_provider_"

```js
const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(todoTitle => {
    setTodos(prevTodos => [...prevTodos, { id: prevTodos.length + 1, todoTitle }]);
  }, []);

  const deleteTodo = useCallback(todoId => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
```

Agreguemos el componente "_provider_" al componente principal de nuestra aplicación(App).

```js
export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Tabs.Navigator screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Inicio',
              tabBarIcon: ({ focused }) => (
                <AntDesign
                  name="home"
                  size={20}
                  color={focused ? '#50e3a4' : '#5C5C5C'}
                />
              ),
              tabBarActiveTintColor: '#50e3a4',
              tabBarInactiveTintColor: '#5C5C5C',
            }}
          />
          <Tabs.Screen
            name="NewTodoScreen"
            component={NewTodoScreen}
            options={{
              title: 'Nueva tarea',
              tabBarIcon: ({ focused }) => (
                <FontAwesome5
                  name="tasks"
                  size={20}
                  color={focused ? '#50e3a4' : '#5C5C5C'}
                />
              ),
              tabBarActiveTintColor: '#50e3a4',
              tabBarInactiveTintColor: '#5C5C5C',
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
```

### TodoCard component

Este component nos servira como presentación del titulo de las tareas creadas. Primero importemos las librerias y componentes necesarios.

```js
import { useState, useContext, useCallback } from 'react';
import { View, Text, CheckBox, TouchableHighlight, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TodoContext } from '../../context';
```

Creemos la estructura del componente.

```js
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
```

Agreguemos los estilos del componente.

```js
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
```

### TodoList component

Este componente es el encargado de listar todas las todo's creadas en la aplicación. Importemos todos los elementos necesarios.

```js
import { useContext } from 'react';
import { FlatList } from 'react-native';
import TodoCard from '../TodoCard';
import { TodoContext } from '../../context';
import EmptyList from '../EmptyList';
```

Creemos el componente.

```js
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
```

### Home screen

Este componente será la pantalla que se renderiza en como home de la aplicación en el componente de navigación principal. Importemos los elementos necesarios para este componente.

```js
import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TodoList from '../../components/TodoList';
import Button from '../../components/Button';
```

Creemos el componente.

```js
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
```

Finalmente agreguemos los estilos de este componente.

```js
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
```

### NewTodo screen

En esta screen se tendrá el formulario para la creación de las todo's que el usuario quiera crear en la aplicación. Primero importemos los elementos necesarios.

```js
import { useCallback, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { TodoContext } from '../../context';
```

Creemos el componente y su lógica para la creación de los todo's.

```js
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
```

Y finalmente los estilos para este componente.

```js
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
```
