/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

const API_URL = 'http://taichung-frontend.kktix.cc/events.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 5,
    paddingHorizontal: 5,
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
    marginTop: 65,
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 5,
    fontSize: 20,
  }
});

export default class Explorer extends Component {
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
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS size='large'/>
        <Text style={styles.loadingText}>
          Loading Events...
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
