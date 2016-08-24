'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import store from 'react-native-simple-store';

const componentStyles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    padding: 20,
    paddingTop: 35,
  },
  headerText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keys: []
    };
  }

  renderKeys() {
    return this.state.keys.map((key) => <Text>{key}</Text>);
  }

  render() {
    return (
      <View>
        <View style={componentStyles.header}>
          <Text style={componentStyles.headerText}>React Native Simple Store Example</Text>
        </View>
        <ScrollView>
          {this.renderKeys.call(this)}
        </ScrollView>
      </View>
    );
  }

}

export default Main;