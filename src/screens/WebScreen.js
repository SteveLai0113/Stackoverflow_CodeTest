import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

class WebScreen extends React.Component {
  render() {
    // console.log(this.params);
    // console.log(this.props.navigation);
    console.log(this.props.route);
    return (
      <WebView
        source={{
          uri: this.props.route?.params.uri,
          //'https://stackoverflow.com/questions/65612124/filter-results-in-seatch-output-issue',
        }}
      />
    );
  }
}

export default WebScreen;
