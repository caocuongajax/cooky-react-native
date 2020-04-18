//import { createAppContainer, createSwitchNavigator } from '@react-navigation/native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//import AuthNavigator from './auth-navigator';
//import AppNavigator from './app-navigator';
import BaseScreen from '../screens/base/index';
import LoginScreen from '../screens/login';
import DetailScreen from '../screens/detail';

/*const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);*/

//export default createAppContainer(RootNavigator);
function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Base" component={BaseScreen} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{headerShown: false}} />
        {/*<Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;