import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const colors = ['#FF0000', '#FFFF00', '#008000', '#0000FF'];

export default class Concentration extends React.Component {
  constructor  () {
    super();
    this.state = {
      color: colors[Math.floor(Math.random() * Math.floor(colors.length - 1))],
      dotCount: Math.floor(Math.random() * Math.floor(4)),
      beforeShape: {},
      point: 0
    }
  }

  componentWillMount () {
    let interval = setInterval(() => { 
      this.changeColorAndDotCount();
    }, 4000);
  }

  changeColorAndDotCount = () => {
    this.setState({
      beforeShape: {'color': this.state.color, 'dotCount': this.state.dotCount},
      color: colors[Math.floor(Math.random() * Math.floor(colors.length - 1))],
      dotCount: Math.floor(Math.random() * Math.floor(4)),
    })
  };

  onClick = (buttonType) => {
    const { beforeShape, color, dotCount } = this.state;

    this.setState({
      beforeShape: {'color': this.state.color, 'dotCount': this.state.dotCount},
      color: colors[Math.floor(Math.random() * Math.floor(colors.length - 1))],
      dotCount: Math.floor(Math.random() * Math.floor(4)),
    },() => {
      if (beforeShape.color === color && buttonType === 'color') {
        this.setPoint();
      } else if (beforeShape.dotCount === dotCount && buttonType === 'dot') {
        this.setPoint();
      } else if (beforeShape.dotCount !== dotCount && beforeShape.color !== color && buttonType === 'notBoth') {
        this.setPoint();
      }
    });
  };

  setPoint = () => {
    this.setState({
      point: this.state.point + 10
    })
  };

  renderDotShape = (styles) => {
    const { dotCount } = this.state;
    const dotView = [];

    for(let i = 0; i < dotCount; i++) {
      dotView.push(
        <View key={i} style={styles[`dot${i+1}`]}/>
      )
    }
    return dotView;
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: `${this.state.color}`,
        marginBottom: 20,
      },
      dot1: {
        height: 10,
        width: 10,
        backgroundColor: '#000000',
        borderRadius: 300,
        position: 'relative',
        top: 50,
        right: 20,
      },
      dot2: {
        height: 10,
        width: 10,
        backgroundColor: '#000000',
        borderRadius: 300,
        position: 'relative',
        top: 50,
      },
      dot3: {
        height: 10,
        width: 10,
        backgroundColor: '#000000',
        borderRadius: 300,
        position: 'relative',
        top: 50,
        right: 10
      }
    });
    return (
      <View style={styles.container}>
        <View style={styles.triangle}>
          {this.renderDotShape(styles)}
        </View>
        { Object.keys(this.state.beforeShape).length > 0 &&
          <View  style={{flexDirection:'row'}}>
            <Button
              onPress={this.onClick.bind(this,'dot')}
              title="Dot"
              buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                width: 100,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
            />
            <Button
              onPress={this.onClick.bind(this,'notBoth')}
              title="Not Both"
              buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                width: 100,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
              }}
            />
            <Button
              onPress={this.onClick.bind(this,'color')}
              title="Color"
              buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                width: 100,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
              }}
            />
          </View>
        }
          <Text>{this.state.point}</Text>
      </View>
    );
  }
}