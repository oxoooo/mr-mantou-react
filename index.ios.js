'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  Image,
  ScrollView,
  PixelRatio
} = React;

let NavigatorIOS = require('NavigatorIOS');
let Dimensions = require('Dimensions');
let ActivityIndicatorIOS = require('ActivityIndicatorIOS');
let WaterfallView = require('./waterfall_view');
let LodingView = require('./loading_view');

let width = Dimensions.get('window').width / 2;

class Meiztu extends Component {
  render() {
    return (
      <NavigatorIOS
        barTintColor='#FFFDE7'
        titleTextColor='#6B6B6B'
        translucent={true}
        shadowHidden={true}
	      style={{flex: 1}}
	      initialRoute={{
			    component: ImagesView,
			    title: 'Mr.Mantou'}} />
    )
  }
}


class ImagesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      reload: false,
      reloaded: false
    };
    this.execQueryApi();
  }

  execQueryApi() {
    fetch("http://119.29.45.113:1024/api/v1/channels/images")
      .then(response => response.json())
      .then(json => {
        this.setState({images: json, reload: false});
      });
  }

  _chaildView() {
    if (this.state.images.length > 0) {
      return (<WaterfallView dataSource={this.state.images} />);
    } else {
      return (
        <LodingView />
      )
    }
  }

  handleScroll(event: Object) {
    if (event.nativeEvent.contentOffset.y < -100 && this.state.reload == false) {
      this.setState({
        reload: true
      });
    } else if (event.nativeEvent.contentOffset.y >= -64 && this.state.reload == true) {
      this.execQueryApi();
    }
  }

  _reloadView() {
    if (this.state.reload == true) {
      return (<LodingView />)
    }
  }

  render() {    
    return (
      <ScrollView 
        onScroll={this.handleScroll.bind(this)}
        scrollEventThrottle={1}     
        removeClippedSubviews={true}
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>
        {this._reloadView()}
        {this._chaildView()}
      </ScrollView>
    )
  }
}


var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFDE7'
  },
  contentContainer: {
    
  },
  imageGroup: {
    flex: 1
  }
});

AppRegistry.registerComponent('Meiztu', () => Meiztu);
