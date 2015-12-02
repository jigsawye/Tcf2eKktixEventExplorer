'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  WebView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  }
})

export default class EventDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          url={this.props.url}
        />
      </View>
    );
  }
}