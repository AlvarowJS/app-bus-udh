import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import HomeStudent from '../screens/HomeStudent';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext(AuthContext)

  console.log(status, "status")
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        (status !== 'authenticated')
          ? (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />

          ) : (
            <Stack.Screen name="HomeStudent" component={HomeStudent} />
          )
      }
    </Stack.Navigator>
  );
}