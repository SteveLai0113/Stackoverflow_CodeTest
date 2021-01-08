import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SearchTagActionCreators from './SearchTagActionCreators';
import {StyleSheet, View, Button, Dimensions, Text} from 'react-native';
import {STACKOVERFLOW_APIKEY} from '@env';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Api from '../Api';
import {TouchableOpacity} from 'react-native-gesture-handler';

class SearchTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={
              this.props.tag == tag.name
                ? styles.tagButtonSelected
                : styles.tagButton
            }
            onPress={() => this.onButtonPress(tag.name)}>
            <Text>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  componentDidMount() {
    this.loadTag();
  }

  onButtonPress(query) {
    this.props.onTagPress(query);
  }

  loadTag = () => {
    let api =
      'https://api.stackexchange.com/2.2/tags?key=' +
      STACKOVERFLOW_APIKEY +
      '&pagesize=10&site=stackoverflow&order=desc&osrt=popular&filter=default';
    console.log(api);
    fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'applcation/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({tags: json.items});
        if (json.items && json.items.length > 0) {
          this.props.onTagPress(json.items[0].name);
        }
      })
      .catch((error) => console.log(error));
  };
}

/// Redux
const mapStateToProps = (state) => {
  const {searchState} = state;
  return {tag: searchState.query};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTagPress: (query) => {
      dispatch(Api.loadQuestions(query));
    },
  };
};
// bindActionCreators(SearchTagActionCreators, dispatch);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width - 20,
    flex: 1,
  },
  tagButtonSelected: {
    margin: 2,
    padding: 4,
    backgroundColor: 'skyblue',
    borderColor: 'skyblue',
    borderWidth: 1,
    color: 'black',
  },
  tagButton: {
    margin: 2,
    padding: 4,
    backgroundColor: 'white',
    borderColor: 'skyblue',
    borderWidth: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTags);
