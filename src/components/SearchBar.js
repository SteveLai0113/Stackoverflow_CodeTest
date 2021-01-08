import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Api from '../Api';

class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter text"
          style={styles.textInputSearch}
          underlineColorAndroid={'transparent'}
          // value={this.props.searchState.query}
          onChangeText={(text) => this.search(text)}
        />
        {/* <TouchableOpacity
          style={styles.textSearchButton}
          onPress={() => this.searchTag()}>
          <Text>Search</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  search = (query) => {
    this.props.searchTag(query);
  };
}

/// Redux
const mapStateToProps = (state) => {
  const {searchState} = state;
  return {searchState};
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchTag: (query) => {
      dispatch(Api.loadQuestions(query));
    },
  };
};

/// Styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 2,
    marginVertical: 10,
    borderColor: 'lightgray',
    flex: 1,
  },
  textInputSearch: {
    flex: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    height: 40,
    paddingLeft: 10,
  },
  textSearchButton: {
    flex: 2,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 40,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
