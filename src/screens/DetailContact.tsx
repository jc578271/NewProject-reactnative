// @ts-ignore
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {
  IC_BACK,
  IC_CALL,
  IC_EDITPROFILEIMG,
  IC_EMAIL,
  IC_FACETIME,
  IC_MESSAGE,
  IMG_DEFAULTPROFILE,
} from '../assets';
import {useContacts} from '../store';
import {deleteContactAction} from '../actions';
import {RawContact} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {statusBarHeight} from '../utils/styles';

const featureItems = [
  {icon: IC_CALL, text: 'Call', typeInfo: 'phones'},
  {icon: IC_MESSAGE, text: 'Message', typeInfo: 'phones'},
  {icon: IC_FACETIME, text: 'Facetime', typeInfo: 'phones'},
  {icon: IC_EMAIL, text: 'Email', typeInfo: 'emails'},
];

const FeatureItem = ({
  icon,
  text,
  available,
  onItemPress,
}: {
  icon: any;
  text: string;
  available: boolean;
  onItemPress: (text: string) => void;
}) => (
  <ItemFeature disabled={!available} onPress={() => onItemPress(text)}>
    <ItemFeatureIcBg available={available}>
      <ItemFeatureIc available={available} text={text} source={icon} />
    </ItemFeatureIcBg>
    <ItemFeatureText available={available}>{text}</ItemFeatureText>
  </ItemFeature>
);

const DetailContact = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const contacts = useContacts();
  const dispatch = useDispatch();

  const contactId = useMemo(() => {
    return route?.params?.id || '';
  }, [route]);

  const [itemContact, setItemContact] = useState<RawContact>({
    id: '',
    firstName: '',
    lastName: '',
    organization: '',
    phones: [],
    emails: [],
    addresses: [],
    birthday: [],
    avatar: '',
    searchText: '',
  });

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setItemContact(contacts.byKey[contactId]);
    }
  }, [contactId, contacts.byKey, isMounted]);

  const deleteMessage = useCallback(() => {
    Alert.alert(
      `Delete ${itemContact?.firstName + itemContact?.lastName} contact`,
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await dispatch(deleteContactAction(contactId));
            navigation.navigate('ContactScreen');
          },
        },
      ],
    );
  }, [itemContact, contactId]);

  const onEditPress = useCallback(() => {
    navigation.navigate('EditContact', {id: contactId});
  }, [contactId]);

  const onItemPress = useCallback((keyName: string) => {
    if (keyName == 'Call') {
      return Linking.openURL(`tel:${itemContact.phones[0]}`);
    }
    if (keyName == 'Message') {
      return Linking.openURL(`sms:${itemContact.phones[0]}`);
    }
  }, []);

  return (
    <>
      <Container>
        <Section1 platform={Platform.OS}>
          <BackgroundColor />
          <HeaderSection>
            <BackBtn onPress={() => navigation.goBack()}>
              <BackIc source={IC_BACK} />
            </BackBtn>
            <EditBtn onPress={onEditPress}>
              <EditText>Edit</EditText>
            </EditBtn>
          </HeaderSection>
          <InfoSection>
            <ProfileImgSection>
              <ProfileImg
                source={
                  itemContact?.avatar
                    ? {uri: itemContact.avatar}
                    : IMG_DEFAULTPROFILE
                }
                isHasAvatar={!!itemContact?.avatar}
              />
              <CamIcon source={IC_EDITPROFILEIMG} />
            </ProfileImgSection>
            <ProfileText>
              {itemContact?.firstName} {itemContact?.lastName}
            </ProfileText>
            <ProfileSubText>{itemContact?.organization}</ProfileSubText>
          </InfoSection>
          <FeatureSection>
            {featureItems.map((item, key) => (
              <FeatureItem
                onItemPress={onItemPress}
                available={itemContact && itemContact[item.typeInfo]?.length}
                icon={item.icon}
                text={item.text}
                key={key}
              />
            ))}
          </FeatureSection>
        </Section1>
        <PhoneSection>
          <PhoneTitle>Phone number</PhoneTitle>
          <PhoneNumber>{itemContact?.phones[0]}</PhoneNumber>
        </PhoneSection>
        <NoteSection>
          <NoteTitle>Note</NoteTitle>
          <NoteContext>Note</NoteContext>
        </NoteSection>
        <SendMessageBtn>
          <SendMessageText>Send message</SendMessageText>
        </SendMessageBtn>
        <DeleteBtn onPress={deleteMessage}>
          <DeleteText>Delete Contact</DeleteText>
        </DeleteBtn>
      </Container>
    </>
  );
};

export default memo(DetailContact);

const Container = styled.View`
  background-color: #ffffff;
  display: flex;
  height: 100%;
`;
const Section1 = styled.View<{platform?: string}>`
  padding: ${statusBarHeight}px 16px 0 16px;
`;
const BackgroundColor = styled.View`
  position: absolute;
  background: #f2a54a;
  opacity: 0.05;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const HeaderSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const BackBtn = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
`;
const BackIc = styled.Image``;
const EditBtn = styled.TouchableOpacity``;
const EditText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: right;
  letter-spacing: -0.41px;
  color: #f2a54a;
`;
const InfoSection = styled.View`
  align-items: center;
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
const ProfileImg = styled(FastImage)<{isHasAvatar?: boolean}>`
  height: ${props => (props.isHasAvatar ? 100 : 80)}px;
  width: ${props => (props.isHasAvatar ? 100 : 80)}px;
  border-radius: 100px;
`;
const CamIcon = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const ProfileText = styled.Text`
  margin-top: 20px;

  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #333333;
`;
const ProfileSubText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: #828282;
`;
const FeatureSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 48px 10px 48px;
`;
const ItemFeature = styled.TouchableOpacity`
  align-items: center;
`;
const ItemFeatureIcBg = styled.View<{available?: boolean}>`
  background-color: ${props => (props.available ? '#F2A54A' : '#FFFFFF')};
  border: ${props => (props.available ? '0' : '0.5px')} solid #bdbdbd;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;
const ItemFeatureIc = styled.Image<{text?: string; available?: boolean}>`
  height: ${props => (props.text == 'Message' ? '18px' : '24px')};
  width: ${props => (props.text == 'Message' ? '18px' : '24px')};
  tint-color: ${props => (props.available ? '#FFFFFF' : '#DADADA;')};
`;
const ItemFeatureText = styled.Text<{available?: boolean}>`
  margin-top: 5px;
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  color: ${props => (props.available ? '#F2A54A' : '#BDBDBD')};
`;
const PhoneSection = styled.View`
  margin: 0 16px;
  padding: 9px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const PhoneTitle = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: #333333;
`;
const PhoneNumber = styled.Text`
  margin-top: 5px;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  color: #2f80ed;
`;
const NoteSection = styled(PhoneSection)``;
const NoteTitle = styled(PhoneTitle)``;
const NoteContext = styled(PhoneNumber)``;
const SendMessageBtn = styled.TouchableOpacity`
  margin: 0 16px;
  padding: 14px 0 8px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const SendMessageText = styled.Text``;
const DeleteBtn = styled(SendMessageBtn)``;
const DeleteText = styled(SendMessageText)`
  color: #ff4a4a;
`;
