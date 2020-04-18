import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from './about.screen';
const Stack = createStackNavigator();

const AboutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AboutScreen" component={AboutScreen} />
  </Stack.Navigator>
)
export default AboutStack;