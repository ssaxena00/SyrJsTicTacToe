import { Dimensions, PixelRatio } from '../../index';

const Styles = {
  mainView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  boardView: {
      width: PixelRatio.getPixelSizeForLayoutSize(500),
      height: PixelRatio.getPixelSizeForLayoutSize(500),
      borderColor: '#000000',
      borderWidth: PixelRatio.getPixelSizeForLayoutSize(10),
      left: (Dimensions.get("window").width / 2) - PixelRatio.getPixelSizeForLayoutSize(250),
      top: (Dimensions.get("window").height / 2) - PixelRatio.getPixelSizeForLayoutSize(200)
  },
  tile: function(row, col, player) {
      const width = PixelRatio.getPixelSizeForLayoutSize(500) / 3;
      const height = PixelRatio.getPixelSizeForLayoutSize(500) / 3;
      const left = col * width;
      const top = row * height;
      var leftWidth =  PixelRatio.getPixelSizeForLayoutSize(3);
      var rightWidth = PixelRatio.getPixelSizeForLayoutSize(3);
      var bottomWidth = PixelRatio.getPixelSizeForLayoutSize(3);
      var topWidth = PixelRatio.getPixelSizeForLayoutSize(3);
      if (col == 0) {
        leftWidth = 0;
      } else if (col == 2) {
        rightWidth = 0;
      }
      if (row == 0) {
        topWidth = 0;
      } else if (row == 2) {
        bottomWidth = 0;
      }

      return {
        height: height,
        width: width,
        left: left,
        top: top,
        borderColor: '#000000',
        borderLeftWidth: leftWidth,
        borderRightWidth: rightWidth,
        borderBottomWidth: bottomWidth,
        borderTopWidth: topWidth,
        color: '#a81015',
        fontSize: 50,
        textAlign: 'center'
      };
  },
  header: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    color: '#0a2f9b',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center'
  },
  promptArea: {
    width: PixelRatio.getPixelSizeForLayoutSize(600),
    height: PixelRatio.getPixelSizeForLayoutSize(60),
    left: (Dimensions.get("window").width / 2) - PixelRatio.getPixelSizeForLayoutSize(300),
    top: (Dimensions.get("window").height / 4) - PixelRatio.getPixelSizeForLayoutSize(50),
    color: '#5224ad',
    fontSize: 30,
    textAlign: 'center'
  },
  result: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    top: (Dimensions.get("window").height) - PixelRatio.getPixelSizeForLayoutSize(300),
    color: '#364660',
    fontWeight: 'normal',
    fontSize: 40,
    textAlign: 'center'
  }
};

export { Styles };
