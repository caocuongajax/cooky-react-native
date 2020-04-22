import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './account.screen';
const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AccountScreen" component={AccountScreen} options={{
      title: 'Tài khoản',
      headerTitleStyle: {
        color: '#fff'
      }, headerStyle: { backgroundColor: '#f39731' },
      headerShown: false
    }} />
  </Stack.Navigator>
)
export default AccountStack;