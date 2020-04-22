import React from 'react';
import { Text } from 'react-native';
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
                let colorIcon = color;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'About') {
                    iconName = focused ? 'color-palette' : 'color-palette-outline';
                    if (focused) {
                        colorIcon = '#8bad18';
                    }
                } else if (route.name === 'Account') {
                    iconName = focused ? 'person' : 'person-outline';
                    if (focused) {
                        colorIcon = '#f39731';
                    }
                }

                // You can return any component that you like here!
                return <Icon name={iconName} width={size} height={size} fill={colorIcon} />;
            },
            tabBarLabel: ({ focused, color }) => {
                let iconName;
                let colorIcon = color;

                if (route.name === 'Home') {
                    iconName = 'Home';
                } else if (route.name === 'About') {
                    iconName = 'Giới thiệu';
                    if (focused) {
                        colorIcon = '#8bad18';
                    }
                } else if (route.name === 'Account') {
                    iconName = 'Tài khoản';
                    if (focused) {
                        colorIcon = '#f39731';
                    }
                }

                return <Text style={{ color: colorIcon }}>{iconName}</Text>;
            }
        })}
        tabBarOptions={{
            style: {
                paddingVertical: 10
            }
        }}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        {/*<Tab.Screen name="About" component={AboutStack} options={{ title: 'Giới thiệu' }} />*/}
        <Tab.Screen name="Account" component={AccountStack} options={{ title: 'Tài khoản' }} />
    </Tab.Navigator>
)
export default BaseScreen;