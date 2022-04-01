// @ts-ignore
import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {IC_BACK} from '../assets';
import {Text} from 'react-native';
import {statusBarHeight} from '../utils/styles';
import {useAuth} from '../store';
import QRCode from 'react-native-qrcode-svg';

const UserProfileScreen = ({navigation}) => {
  const [qr, setQr] = useState('');
  const auth = useAuth();

  useEffect(() => {
    if (auth.id) {
      setQr(JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <Container>
      <HeaderSection>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIc source={IC_BACK} />
        </BackBtn>
      </HeaderSection>
      <Text>{qr && <QRCode value={qr} />}</Text>
    </Container>
  );
};

export default memo(UserProfileScreen);

const Container = styled.View`
  padding: ${statusBarHeight}px 16px 0 16px;
`;
const HeaderSection = styled.View`
  display: flex;
  padding: 0 16px;
`;
const BackBtn = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
`;
const BackIc = styled.Image``;
