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

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width / 2;

class WaterfallView extends Component {
  
  propTypes: {
    dataSource: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [[], []]
    };
    this._initDataSource()
  }

  _initDataSource() {
    let leftHeight = 0;
    let rightHeight = 0;

    this.props.dataSource.forEach((obj) => {
      let image = this.reSize(obj);
      if (leftHeight > rightHeight) {
        this.state.list[1].push(image);
        rightHeight += image.height;
      } else {
        this.state.list[0].push(image);
        leftHeight += image.height;
      }
    });
  }

  reSize(image) {
    let proportion = image.meta.width / width;
    let imageWidth = width * PixelRatio.get();
    return {
      height: Math.floor(image.meta.height / proportion),
      url: image.url + "?imageView2/0/w/" + imageWidth + "/format/jpg/q/80"
    }
  }

  _renderChaild(index) {
    return this.state.list[index].map((obj, key) => {
      return (
        <Image source={{uri: obj.url}} style={{width: width, height: obj.height}} />
      )
    })
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={styles.imageGroup}>
          {this._renderChaild(0)}
        </View>
        <View style={styles.imageGroup}>
          {this._renderChaild(1)}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  imageGroup: {
    flex: 1
  }
});

module.exports = WaterfallView;