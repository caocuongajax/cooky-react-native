import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from './about.screen';
const Stack = createStackNavigator();

const AboutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AboutScreen" component={AboutScreen}
      options={{
        title: 'Giới thiệu',
        headerStyle: {
          backgroundColor: '#8bad18'
        },
        headerTitleStyle: {
          color: '#fff'
        }
      }}
    />
  </Stack.Navigator>
)
export default AboutStack;