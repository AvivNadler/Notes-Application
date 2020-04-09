import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Pages/Home';
import Category from './Pages/Category';
import Note from './Pages/Note';
import CameraGo from './Pages/CameraGo';



class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Category: { screen: Category },
    Note: { screen: Note },
    CameraGo: { screen: CameraGo }
  },
  {
    initialRouteName: 'Home',
    

  }
);

export default createAppContainer(AppNavigator);