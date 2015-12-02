/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import Explorer from './components/Explorer';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class Tcf2eKktixEventExplorer extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Explorer,
          title: 'Taichung Frontend Events',
        }}
      />
    );
  }
}

AppRegistry.registerComponent('Tcf2eKktixEventExplorer', () => Tcf2eKktixEventExplorer);
