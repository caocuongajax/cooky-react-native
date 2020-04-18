import React from 'react';
//import { SafeAreaView, Text, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
import HomeScreen from '../home/index';
import AboutStack from '../about';
import AccountStack from '../account';
const Tab = createBottomTabNavigator();

const BaseScreen = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'About') {
                    iconName = focused ? 'color-palette' : 'color-palette-outline';
                } else if (route.name === 'Account') {
                    iconName = focused ? 'person' : 'person-outline';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} width={size} height={size} fill={color} />;
            },
        })}
        tabBarOptions={{
            style: {
                paddingVertical: 10
            }
        }}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutStack} options={{title: 'Giới thiệu'}} />
        <Tab.Screen name="Account" component={AccountStack} options={{title: 'Tài khoản'}} />
    </Tab.Navigator>
)
export default BaseScreen;

/*<SafeAreaView>
  <Text>Screen: Base</Text>

  <TouchableHighlight onPress={() => navigation.navigate('Home')}>
    <Text>Go to home</Text>
</TouchableHighlight>
</SafeAreaView>*/