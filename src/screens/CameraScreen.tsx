// @ts-ignore
import React, {memo, useCallback, useRef, useState} from 'react';
import {Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styled from 'styled-components/native';
import {IC_BACK} from '../assets';
import {statusBarHeight} from '../utils/styles';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CameraScreen = ({navigation}) => {
  const [isScanned, setScan] = useState(false);
  let ref = useRef<QRCodeScanner | null>(null).current;

  const onSuccess = useCallback(async e => {
    const data = await JSON.parse(e.data);
    setScan(true);
    navigation.navigate('AddContact', {data});
  }, []);

  const rescanOnPress = useCallback(() => {
    ref?.reactivate();
  }, [ref, isScanned]);

  return (
    <Container>
      <HeaderSection>
        <BackBtn onPress={() => navigation.goBack()}>
          <BackIc source={IC_BACK} />
        </BackBtn>
        <EditBtn>
          <EditText>Edit</EditText>
        </EditBtn>
      </HeaderSection>
      <Section2>
        <Text>Scan to add contact</Text>
        <QRView>
          <QRCodeScanner
            ref={view => (ref = view)}
            cameraStyle={{height: 200, width: 200}}
            onRead={onSuccess}
          />
          <RedLine />
        </QRView>

        {isScanned && (
          <Rescan onPress={rescanOnPress}>
            <RescanText>Rescan</RescanText>
          </Rescan>
        )}
      </Section2>
    </Container>
  );
};

export default memo(CameraScreen);

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${statusBarHeight}px;
`;
const HeaderSection = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
`;
const BackBtn = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
`;
const BackIc = styled.Image``;
const EditBtn = styled.TouchableOpacity``;
const EditText = styled.Text`
  font-size: 18px;
  line-height: 22px;
  text-align: right;
  letter-spacing: -0.41px;
  color: #f2a54a;
`;
const Section2 = styled.View`
  align-items: center;
  justify-content: center;
  flex: auto;
`;
const QRView = styled.View`
  margin-top: 10px;
  overflow: hidden;
  width: 200px;
  height: 200px;
`;
const RedLine = styled.View`
  position: absolute;
  background-color: red;
  height: 1px;
  left: 0;
  right: 0;
  top: 50%;
  z-index: 99;
`;
const Rescan = styled.TouchableOpacity`
  margin-top: 10px;
  border: 1px solid #f2a54a;
  border-radius: 4px;
  padding: 16px;
  align-items: center;
`;
const RescanText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #f2a54a;
`;
