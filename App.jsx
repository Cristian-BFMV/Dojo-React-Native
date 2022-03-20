import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './src/screens/Home';
import NewTodoScreen from './src/screens/NewTodo';
import TodoProvider from './src/context';

const Tabs = createBottomTabNavigator();

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
