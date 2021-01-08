import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMore: false,
    };
  }
  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  _keyExtractor = (item, index) => item.question_id.toString();

  _renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          // const navigation = useNavigation();
          this.props.navigate.navigate('Web', {uri: item.link});
        }}>
        <View style={styles.itemContainer}>
          <View style={styles.itemContainerLeft}>
            <View style={styles.itemContainerTitle}>
              <Text>{item.title}</Text>
            </View>
            <View style={styles.itemContainerValueContainer}>
              <View style={styles.itemContainerValue}>
                <Text>Score</Text>
                <Text
                  style={
                    item.score < 0
                      ? styles.itemScoreTextMinus
                      : styles.itemScoreText
                  }>
                  {item.score}
                </Text>
              </View>
              <View style={styles.itemContainerValue}>
                <Text>Answers</Text>
                <Text
                  style={
                    item.answer_count > 0
                      ? item.is_answered
                        ? styles.itemAnswersTextHighlight
                        : styles.itemAnswersTextBorder
                      : styles.itemAnswersText
                  }>
                  {item.answer_count}
                </Text>
              </View>
              <View style={styles.itemContainerValue}>
                <Text>Viewed</Text>
                <Text>{item.view_count}</Text>
              </View>
            </View>
          </View>
          <View style={styles.itemContainerRight}>
            <Image
              style={styles.itemProfileImage}
              source={{uri: item.owner.profile_image}}
            />
            <Text style={{textAlign: 'center'}}>{item.owner.display_name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    if (this.props.questions.length) {
      temp = this.props.questions;
      console.log(
        'Length:' + temp.length + '--Last:' + temp[temp.length - 1].question_id,
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.questions}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          keyExtractor={this._keyExtractor}
          onEndReached={this._handleLoadMore}
        />
      </View>
    );
  }

  _handleLoadMore = () => {
    console.log('_HandleLoadMOre Called:' + this.props.loading);

    if (this.props.loading) {
      return;
    }
    this.props.loading = true;
    const nextPage = this.props.page + 1;
    this.props.loadMore(this.props.query, nextPage, 20);
    console.log('onLoadMore page:' + nextPage);
  };
}

/// Redux
const mapStateToProps = (state) => {
  const {searchState} = state;
  return {
    questions: searchState.results,
    query: searchState.query,
    page: searchState.page,
    loading: searchState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMore: (tag, nextPage, count) => {
      dispatch(Api.loadQuestions(tag, nextPage, count));
    },
  };
};
/// Styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    alignItems: 'stretch',
    flex: 9,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  itemContainerLeft: {
    flex: 3,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  itemContainerRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  itemContainerTitle: {},
  itemContainerValueContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  itemContainerValue: {
    aspectRatio: 1,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  itemScoreText: {
    color: 'black',
  },
  itemScoreTextMinus: {
    color: 'red',
  },
  itemAnswersText: {
    color: 'black',
    backgroundColor: null,
  },
  itemAnswersTextBorder: {
    color: 'green',
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: null,
  },
  itemAnswersTextHighlight: {
    backgroundColor: 'green',
    color: 'white',
  },
  itemProfileImage: {
    width: 'auto',
    aspectRatio: 1,
    borderRadius: 50,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
