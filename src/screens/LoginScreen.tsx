// @ts-ignore
import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {IC_LOGO, IC_SMALLLOGO, IMG_HOMEBG} from '../assets';
import {useDispatch} from 'react-redux';
import {loginAction} from '../actions';
import {statusBarHeight} from '../utils/styles';

interface Props {
  navigation: any;
}

const LoginScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const loginOnPress = useCallback(async () => {
    await dispatch(
      loginAction({
        id: '1',
        firstName: 'Nguyen',
        lastName: 'Le Hoang',
        organization: '',
        phones: ['0988313832'],
        emails: [],
        addresses: [],
        birthday: [],
        avatar: '',
      }),
    );
    navigation.navigate('TabStack');
  }, []);

  return (
    <>
      <Container>
        <Section1>
          <HomeBg resizeMode="contain" source={IMG_HOMEBG} />
          <LogoAppIcon source={IC_LOGO} />
        </Section1>
        <Section2>
          <Title>Base wework</Title>
          <SubTitle>
            {`Giải pháp quản lý công việc\n& dự án toàn diện cho doanh nghiệp 4.0`}
          </SubTitle>
          <SmallLogoSection>
            <SmallLogoIcon source={IC_SMALLLOGO} />
          </SmallLogoSection>
        </Section2>
        <Section3>
          <NonAuthText>Bạn chưa đăng nhập</NonAuthText>
          <LoginBtn onPress={loginOnPress}>
            <LoginText>Đăng nhập bằng base account</LoginText>
          </LoginBtn>
          <ManualLoginBtn>
            <ManualLoginText>Đăng nhập thủ công</ManualLoginText>
          </ManualLoginBtn>
        </Section3>
      </Container>
    </>
  );
};

export default memo(LoginScreen);

const Container = styled.View`
  background-color: #ffffff;
  display: flex;
  flex: 1;
  padding-top: ${statusBarHeight}px;
`;
const Section1 = styled.View`
  align-items: center;
`;
const LogoAppIcon = styled.Image`
  margin-top: 50px;
  margin-bottom: 40px;
  width: 200px;
  height: 200px;
`;
const HomeBg = styled.Image`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;
const Section2 = styled.View`
  display: flex;
  align-items: center;
  flex: 1;
`;
const Title = styled.Text`
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  margin-top: 20px;
  margin-bottom: 5px;
  letter-spacing: 0.12px;
  color: #f2a54a;
`;
const SubTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #333333;
`;
const SmallLogoSection = styled.View`
  flex: auto;
`;
const SmallLogoIcon = styled.Image`
  margin: auto;
`;
const Section3 = styled.View`
  margin: 0 20px 30px 20px;
`;
const NonAuthText = styled.Text`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.24px;
  color: #828282;
`;
const LoginBtn = styled.TouchableOpacity`
  height: 48px;
  background: #f2a54a;
  border-radius: 4px;

  justify-content: center;
  margin-bottom: 10px;
`;
const LoginText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.24px;
  text-transform: uppercase;
  color: #ffffff;
`;
const ManualLoginBtn = styled(LoginBtn)`
  border: 1px solid #f2a54a;
  box-sizing: border-box;
  background: #ffffff;
`;
const ManualLoginText = styled(LoginText)`
  color: #f2a54a;
`;
