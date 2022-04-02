// @ts-ignore
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import styled from 'styled-components/native';
// @ts-ignore
import moment from 'moment';
import ImageResizer from 'react-native-image-resizer';
import Toast, {ToastShowParams} from 'react-native-toast-message';
import * as ImagePicker from 'react-native-image-picker';
import {IC_EDIT_PROFILE_IMG, IMG_DEFAULT_PROFILE} from '../assets';
import {useContacts} from '../store';
import {updateContactAction} from '../actions';
import {useDispatch} from 'react-redux';
import {toastConfig} from '../components/BaseToast';
import FastImage from 'react-native-fast-image';
import {InputNormal} from '../components/InputNormal';
import {InputWithArray} from '../components/InputWithArray';
import {nonAccentVietnamese} from '../utils/helper';
import {statusBarHeight} from '../utils/styles';

const AddItemContact = ({navigation, route}) => {
  const [params, setParams] = useState({
    id: '',
    firstName: '',
    lastName: '',
    organization: '',
    avatar: '',
    phones: [],
    emails: [],
    addresses: [],
    birthday: [],
  });
  const [inputConfig, setInputConfig] = useState({
    phones: {
      typeKeyboard: 'numeric',
      isEditing: false,
      id: -1,
    },
    emails: {
      typeKeyboard: 'email-address',
      isEditing: false,
      id: -1,
    },
    addresses: {
      typeKeyboard: 'default',
      isEditing: false,
      id: -1,
    },
    birthday: {
      typeKeyboard: 'datePicker',
      isEditing: false,
      id: -1,
    },
  });
  const dispatch = useDispatch();
  const contacts = useContacts();
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && route.params?.id) {
      let itemContact = contacts.byKey[route.params.id];
      let {phones, emails, addresses, birthday} = itemContact;
      return setParams(prev => {
        return {
          ...prev,
          ...itemContact,
          phones: [...phones],
          emails: [...emails],
          addresses: [...addresses],
          birthday: [...birthday],
        };
      });
    }

    if (route.params?.data) {
      return setParams(prev => {
        return {
          ...prev,
          ...route.params?.data,
        };
      });
    }
  }, [isMounted, route.params]);

  const restoreState = useCallback(() => {
    navigation.goBack();
  }, []);

  const profileInfoOnChange = useCallback(
    (key: string, text: string | string[]) => {
      setParams(prev => ({
        ...prev,
        [key]: text,
      }));
    },
    [],
  );

  const camOnPress = useCallback(() => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    }).then(res => {
      if (res.assets) {
        ImageResizer.createResizedImage(
          res?.assets[0]?.uri,
          200,
          200,
          'JPEG',
          100,
        ).then(response => {
          setParams(prev => ({
            ...prev,
            avatar: res.assets?.length ? response.uri : '',
          }));
        });
      }
    });
  }, [params.avatar]);

  const onDone = useCallback(async () => {
    let isValidName = params.firstName + params.lastName != '',
      isValidPhone = !!params.phones.filter(item => item.trim() != '').length,
      isValidEmail = params.emails.every(
        item =>
          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(item.trim()) ||
          item.trim() == '',
      );
    let toastConfig: ToastShowParams = {
      position: 'bottom',
      visibilityTime: 1000,
      autoHide: true,
    };

    if (!isValidName) {
      Toast.show({
        ...toastConfig,
        text1: 'Enter name please',
        type: 'error',
      });
      return;
    }
    if (!isValidPhone) {
      Toast.show({
        ...toastConfig,
        text1: 'Enter phone number please',
        type: 'error',
      });
      return;
    }
    if (!isValidEmail) {
      Toast.show({
        ...toastConfig,
        text1: 'Invalid email',
        type: 'error',
      });
      return;
    }

    const searchField = `${params.firstName}${params.lastName}${
      params.organization
    }${nonAccentVietnamese(params.firstName)}${nonAccentVietnamese(
      params.lastName,
    )}${nonAccentVietnamese(params.organization)}${(params.phones || []).join(
      '',
    )}`
      .replace(/\s{2,}/g, '')
      .toLowerCase();

    let submit = {
      id: params.id || moment().unix().toString(),
      avatar: params.avatar,
      firstName: params.firstName.replace(/\s{2,}/g, ' ').trim(),
      lastName: params.lastName.replace(/\s{2,}/g, ' ').trim(),
      organization: params.organization.replace(/\s{2,}/g, ' ').trim(),
      phones: params.phones.filter(item => item != ''),
      emails: params.emails.filter(
        item => item.replace(/\s{2,}/g, ' ').trim() != '',
      ),
      addresses: params.addresses.filter(
        item => item.replace(/\s{2,}/g, ' ').trim() != '',
      ),
      birthday: params.birthday,
      searchText: searchField,
    };
    await dispatch(updateContactAction(submit));
    navigation.navigate('ContactScreen');
  }, [params]);

  return (
    <KeyBoardView
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <HeaderSection>
        <CancelBtn onPress={() => restoreState()}>
          <CancelText>Cancel</CancelText>
        </CancelBtn>
        <DoneBtn onPress={onDone}>
          <DoneText>Done</DoneText>
        </DoneBtn>
      </HeaderSection>
      <Container keyboardShouldPersistTaps="handled">
        <ProfileImgSection>
          <ProfileImg
            source={params.avatar ? {uri: params.avatar} : IMG_DEFAULT_PROFILE}
            avatar={params.avatar}
          />
          <CamBtn onPress={camOnPress}>
            <CamIcon source={IC_EDIT_PROFILE_IMG} />
          </CamBtn>
        </ProfileImgSection>

        <InputNormal
          title={'First name'}
          keyName={'firstName'}
          value={params.firstName}
          onChangeValue={profileInfoOnChange}
        />
        <InputNormal
          title={'Last name'}
          keyName={'lastName'}
          value={params.lastName}
          onChangeValue={profileInfoOnChange}
        />
        <InputNormal
          title={'Organization'}
          keyName={'organization'}
          value={params.organization}
          onChangeValue={profileInfoOnChange}
        />

        <InputWithArray
          keyName={'phones'}
          list={params.phones}
          config={inputConfig.phones}
          setParams={setParams}
          setConfig={setInputConfig}
          title={'Add phone number'}
        />
        <InputWithArray
          keyName={'emails'}
          list={params.emails}
          config={inputConfig.emails}
          setParams={setParams}
          setConfig={setInputConfig}
          title={'Add email'}
        />
        <InputWithArray
          keyName={'addresses'}
          list={params.addresses}
          config={inputConfig.addresses}
          setParams={setParams}
          setConfig={setInputConfig}
          title={'Add address'}
        />
        <InputWithArray
          keyName={'birthday'}
          list={params.birthday}
          config={inputConfig.birthday}
          setParams={setParams}
          setConfig={setInputConfig}
          title={'Add birthday'}
        />
      </Container>
      <Toast config={toastConfig} />
    </KeyBoardView>
  );
};

export default memo(AddItemContact);

const KeyBoardView = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: #ffffff;
`;
const Container = styled.ScrollView`
  display: flex;
  padding: 0 16px;
`;
const HeaderSection = styled.View`
  background-color: #ffffff;
  padding: ${statusBarHeight}px 16px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CancelBtn = styled.TouchableOpacity``;
const CancelText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #f2a54a;
`;
const DoneBtn = styled.TouchableOpacity``;
const DoneText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #f2a54a;
`;
const ProfileImgSection = styled.View`
  margin-top: 12px;
  width: 100px;
  height: 100px;
  background-color: #f2f2f2;
  border-radius: 100px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
const ProfileImg = styled(FastImage)<{avatar?: any}>`
  height: ${props => (props.avatar ? 100 : 80)}px;
  width: ${props => (props.avatar ? 100 : 80)}px;
  border-radius: 100px;
`;
const CamBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const CamIcon = styled.Image``;
