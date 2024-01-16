/* eslint-disable */

import {LogIn, Welcome} from './src/screens';
import {SafeAreaView, StyleSheet} from 'react-native';

export const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <LogIn />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
