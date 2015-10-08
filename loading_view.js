'use strict';

let React = require('react-native');

let {
  StyleSheet,
  Text,
  View,
  Component,
  Animated
} = React;

class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._animate();
  }

  _animate() {
    this.state.bounceValue.setValue(1.5);
    Animated.spring(this.state.bounceValue, {
      toValue: 1,
      friction: 1
    }).start(this._animate.bind(this));
  }

  render() {
    return (
      <View style={styles.box}>
        <Animated.View style={[styles.circle, {transform: 
            [{scale: this.state.bounceValue}]}]} />
      </View>
    );
  }
}

let styles = StyleSheet.create({

  box: {
    marginTop: 20,
    flex: 1, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    height: 30
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F9A825"
  }
});

module.exports = LoadingView;