import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RootNavigators from './src/Navigation/RootNavigator';

import { LogBox } from 'react-native';


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RootNavigators />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});