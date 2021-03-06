import * as React from 'react';
import {memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {IC_BACK} from '../assets';
import {useCollections} from '../store';
import {RawCollection} from '../types';
import {statusBarHeight} from '../utils/styles';

const CollectionHeader = ({routeParent, navigation}) => {
  const collections = useCollections();
  const [itemCollection, setItemCollection] = useState<RawCollection>({
    id: '',
    title: '',
    list: [],
  });
  useEffect(() => {
    let newList = [...collections];
    setItemCollection(newList.find(item => item.id == routeParent.params?.id));
  }, [collections, routeParent.params?.id]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <Container>
      <BackBtn onPress={onPressBack}>
        <BackIc source={IC_BACK} />
      </BackBtn>
      <TitleSection>
        <TitleText>{itemCollection?.title}</TitleText>
        <TitleSubText>{itemCollection?.list.length} members</TitleSubText>
      </TitleSection>
      <Sth />
    </Container>
  );
};

export default memo(CollectionHeader);

const Container = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  padding: ${statusBarHeight}px 16px 0 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1); ;
`;
const BackBtn = styled.TouchableOpacity``;
const BackIc = styled.Image`
  width: 16px;
  height: 15px;
`;
const TitleSection = styled.View`
  flex: auto;
  align-items: center;
`;
const TitleText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  text-align: center;
  color: #333333;
`;
const TitleSubText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  color: #828282;
`;
const Sth = styled.View`
  width: 24px;
`;
