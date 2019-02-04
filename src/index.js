import { Component, Render, View, Dimensions, Animated } from 'syr';

import { Styles } from './Styles/tictactoe';

class MyComponent extends Component {
  render() {
    return (
      <View style={Styles.view}>
        <Text style={Styles.text}>Welcome to Syr Development!</Text>
      </View>
    );
  }
}

Render(MyComponent);
