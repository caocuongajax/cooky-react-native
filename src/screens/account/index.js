import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './account.screen';
const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AccountScreen" component={AccountScreen} />
  </Stack.Navigator>
)
export default AccountStack;