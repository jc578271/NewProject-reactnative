// @ts-ignore
import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {IC_BACK, IMG_DEFAULTPROFILE} from '../assets';
import {Dimensions, Text} from 'react-native';
import {statusBarHeight} from '../utils/styles';
import {useAuth} from '../store';
import QRCode from 'react-native-qrcode-svg';
import FastImage from 'react-native-fast-image';

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
      <Section1>
        <Section1Bg />
        <HeaderSection>
          <BackBtn onPress={() => navigation.goBack()}>
            <BackIc source={IC_BACK} />
          </BackBtn>
        </HeaderSection>
        <ProfileImgWrap>
          <ProfileImg
            isHasAvatar={!!auth?.avatar.length}
            source={
              auth?.avatar.length ? {uri: auth.avatar} : IMG_DEFAULTPROFILE
            }
          />
        </ProfileImgWrap>
        <NameText>
          {auth?.firstName} {auth?.lastName}
        </NameText>
        <Subtext>{auth.organization}</Subtext>
        <PhoneText>{auth.phones[0]}</PhoneText>
      </Section1>

      <QRWrap>
        <GuideText>Scan to add this contact</GuideText>
        <Text>{qr && <QRCode value={qr} />}</Text>
      </QRWrap>
    </Container>
  );
};

export default memo(UserProfileScreen);

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
const HeaderSection = styled.View`
  width: 100%;
`;
const BackBtn = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
`;
const BackIc = styled.Image``;
const Section1 = styled.View`
  padding: ${statusBarHeight}px 16px 30px 16px;
  align-items: center;
`;
const Section1Bg = styled.View`
  background-color: #f2a54a;
  opacity: 0.05;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;
const ProfileImgWrap = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
`;
const ProfileImg = styled(FastImage)<{isHasAvatar?: boolean}>`
  width: ${props => (props.isHasAvatar ? 100 : 80)}px;
  height: ${props => (props.isHasAvatar ? 100 : 80)}px;
`;
const NameText = styled.Text`
  margin-top: 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #333333;
`;
const Subtext = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: #828282;
`;
const PhoneText = styled.Text`
  line-height: 22px;
  color: #2f80ed; ;
`;

const QRWrap = styled.View`
  flex: auto;
  justify-content: center;
  margin: auto;
  align-items: center;
`;
const GuideText = styled.Text`
  margin-bottom: 10px;
`;
