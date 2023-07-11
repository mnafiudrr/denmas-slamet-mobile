import React, {
  forwardRef,
  Ref, useImperativeHandle, useState,
} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Visible from './Visible';

type LoadingProps = {
  show?: boolean,
};

const AppLoading = forwardRef((props: LoadingProps, ref: Ref<any>) => {
  const {show = true} = props;
  const [isShow, setShow] = useState<boolean>(show ?? false);

  useImperativeHandle(ref, () => ({
    showLoading: (value: boolean) => {setShow(value);},
  }));

  return (
    <Visible visible={isShow}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          position: 'absolute',
          zIndex: 100,
          height: heightPercentageToDP(100) + widthPercentageToDP(10),
          width: widthPercentageToDP(100),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <View style={{}}> */}
        <ActivityIndicator size="large" color={'white'} />
        <Text
          style={{
            fontSize: wp(100) < 600 ? wp(4) : wp(100) < 700 ? wp(3) : wp(2),
            color: 'white',
            textAlign: 'center',
            marginTop: wp(4),
            fontWeight: 'bold',
          }}
        >
          Loading...
        </Text>
        {/* </View> */}
      </View>
    </Visible>
  );
});
AppLoading.defaultProps = {
  show: false,
};

export {AppLoading};
export default AppLoading;
