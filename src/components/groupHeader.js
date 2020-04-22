import React from 'react';
import { Text, View } from 'react-native';

export const Header = (props) => (
  <View {...props}>
    {/*<Text category='h6'>Maldives</Text>*/}
    <Text style={{ fontSize: 18, fontWeight: '500', color: props.colorText?props.colorText:'#FF3D71' }}>{props.name}</Text>
  </View>
);