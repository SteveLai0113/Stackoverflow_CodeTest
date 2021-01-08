/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import configureStore from './src/configureStore';
import SearchBar from './src/components/SearchBar';
import SearchTags from './src/components/SearchTags';
import SearchResults from './src/components/SearchResults';
import WebScreen from './src/screens/WebScreen';

const Stack = createStackNavigator();
const store = configureStore();

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.contianer}>
        <SearchBar />
        <SearchTags />
        <SearchResults navigate={this.props.navigation} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Web" component={WebScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
