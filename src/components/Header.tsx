// @ts-ignore
import React, {memo, useCallback} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {IC_CAM, IC_MENU} from '../assets';
import {statusBarHeight} from '../utils/styles';

const Header = ({route, navigation}: any) => {
  const menuOnPress = useCallback(() => {
    navigation.openDrawer();
  }, []);

  const camOnPress = useCallback(() => {
    navigation.navigate('CameraScreen');
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Container>
        <MenuBtn onPress={menuOnPress}>
          <MenuImg source={IC_MENU} />
        </MenuBtn>
        <Section1>
          <Title>{route.params?.title || route.name}</Title>
        </Section1>
        <CamBtn onPress={camOnPress}>
          <CamImg source={IC_CAM} />
        </CamBtn>
      </Container>
    </>
  );
};

export default memo(Header);

export const StatusBarSection = styled.View<{height?: string | number}>`
  background-color: #ffffff;
  height: ${props => props.height}px;
`;

const Container = styled.View`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: ${statusBarHeight}px 16px 10px 16px;
  justify-content: center;
  align-items: center;
`;
const MenuBtn = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
`;
const MenuImg = styled.Image``;
const Section1 = styled.View`
  flex: auto;
  align-items: center;
`;
const Title = styled.Text`
  font-weight: 500;
  font-size: 24px;
  color: #333333;
`;
const CamBtn = styled(MenuBtn)``;
const CamImg = styled(MenuImg)``;
