/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native';

const API_URL = 'http://taichung-frontend.kktix.cc/events.json';

class Tcf2eKktixEventExplorer extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  getImageUrl(url) {
    return fetch(url)
      .then(res => res.text())
      .then(text => {
        const regexp = new RegExp(/<meta property="og:image" content="(.*)">/);
        return text.match(regexp)[1];
      });
  }

  fetchEvents() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const loadImage = data.entry.map(event => {
          return this.getImageUrl(event.url)
            .then(url => {
              return {
                ...event,
                image_url: url
              };
            });
        });

        Promise.all(loadImage).then(result => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(result),
            loaded: true
          });
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEvent.bind(this)}
        style={styles.listView}
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.fullContainer}>
        <Text style={styles.loading}>
          Loading……
        </Text>
      </View>
    );
  }

  renderEvent(event) {
    return (
      <TouchableHighlight underlayColor="#FFFFFF">
        <View style={styles.container}>
          <Image
            source={{ uri: event.image_url }}
            style={styles.thumbnail}
          />
          <View style={styles.event}>
            <Text style={styles.title}>{event.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  thumbnail: {
    height: 150,
  },
  event: {
    height: 30,
    opacity: 0.7,
    backgroundColor: '#000000',
  },
  title: {
    padding: 5,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  fullContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 24,
  }
});

AppRegistry.registerComponent('Tcf2eKktixEventExplorer', () => Tcf2eKktixEventExplorer);
