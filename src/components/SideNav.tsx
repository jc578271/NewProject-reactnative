// @ts-ignore
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  IC_ADDCOLLECTION,
  IC_DROP,
  IC_ITEMCOLLECTION,
  IC_REDDELETE,
  IMG_PROFILE,
} from '../assets';
import {RawCollection} from '../types';
import {useCollections} from '../store';
// @ts-ignore
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deleteCollectionAction, updateCollectionAction} from '../actions';
import {statusBarHeight} from '../utils/styles';

const SideNav = ({navigation}: any) => {
  const [isExpanded, setIsExpand] = useState(true);
  const animation = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [listHeight, setListHeight] = useState(0);
  const collectionsStore = useCollections();
  const [collections, setCollections] = useState<RawCollection[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCollections([...collectionsStore]);
  }, [collectionsStore]);

  useEffect(() => {
    let initVal = isExpanded ? listHeight : 0;
    let finalVal = isExpanded ? 0 : listHeight;

    animation.setValue({x: 0, y: -initVal});
    Animated.spring(animation, {
      toValue: {x: 0, y: -finalVal},
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const itemOnPress = useCallback(({id}: any) => {
    navigation.navigate('Collections', {id});
  }, []);

  const onAddPress = useCallback(() => {
    let id = moment().valueOf().toString();
    setIsEditing(true);
    setCollections(collectionPrev => [
      ...collectionPrev,
      {id, title: '', list: []},
    ]);
  }, [isEditing]);

  const onDeletePress = useCallback((id, title) => {
    Alert.alert(`Delete ${title} collection`, 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => await dispatch(deleteCollectionAction(id)),
      },
    ]);
  }, []);

  const onInputChange = useCallback(
    (text, id) => {
      setCollections(collectionPrev => {
        return collectionPrev.map(item =>
          item.id == id ? {...item, title: text} : item,
        );
      });
    },
    [collections],
  );

  const onSaveEditPress = useCallback(async () => {
    if (isEditing) {
      await dispatch(
        updateCollectionAction(
          collections.filter(item => item.title.trim() != ''),
        ),
      );
    }
    setIsEditing(!isEditing);
  }, [isEditing, collections]);

  const itemRender = useCallback(
    ({id, title}, key) => (
      <ItemSection
        key={key}
        onPress={() => itemOnPress({id})}
        onLongPress={() => setIsEditing(true)}
      >
        <ItemIc source={IC_ITEMCOLLECTION} />
        <ItemText>{title}</ItemText>
      </ItemSection>
    ),
    [isEditing],
  );

  const itemInputRender = useCallback(
    ({id, title}, key) => (
      <ItemInputSection topPadding={Platform.OS == 'ios' ? 14 : 8} key={key}>
        <ItemIc source={IC_ITEMCOLLECTION} />
        <ItemInput
          placeholder="input collection"
          value={title}
          onChangeText={text => onInputChange(text, id)}
        />
        <DeleteBtn onPress={() => onDeletePress(id, title)}>
          <DeleteIc source={IC_REDDELETE} />
        </DeleteBtn>
      </ItemInputSection>
    ),
    [isEditing, collections],
  );

  const goToProfile = useCallback(() => {
    navigation.navigate('UserProfileScreen');
  }, []);

  return (
    <Container>
      <ProfileSection onPress={goToProfile}>
        <ProfileImg source={IMG_PROFILE} />
        <TextSection>
          <NameText>Nguyen Le Hoang</NameText>
          <SubText>Hello</SubText>
        </TextSection>
      </ProfileSection>
      <AddCollectionSection>
        <AddBtn onPress={onAddPress}>
          <AddImgBtn source={IC_ADDCOLLECTION} />
        </AddBtn>
        <AddTitle>New collection</AddTitle>
      </AddCollectionSection>
      <DropSection>
        <DropBtn onPress={() => setIsExpand(!isExpanded)}>
          <DropImgBtn
            style={{transform: [{scaleY: isExpanded ? 1 : -1}]}}
            source={IC_DROP}
          />
        </DropBtn>
        <DropText>Collection</DropText>
        <DropEditBtn onPress={onSaveEditPress}>
          <DropEditText>{isEditing ? 'Save' : 'Edit'}</DropEditText>
        </DropEditBtn>
      </DropSection>

      <ListSection>
        <Animated.View
          onLayout={e => setListHeight(e.nativeEvent.layout.height)}
          style={[animation.getLayout()]}
        >
          {collections.map((collection, key) =>
            isEditing
              ? itemInputRender(collection, key)
              : itemRender(collection, key),
          )}
        </Animated.View>
      </ListSection>
    </Container>
  );
};

export default memo(SideNav);

const Container = styled.View`
  display: flex;
  flex: auto;
`;
const ProfileSection = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: ${statusBarHeight}px 20px 12px 20px;
  background-color: #f2a54a;
  align-items: center;
`;
const ProfileImg = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 100px;
`;
const TextSection = styled.View`
  display: flex;
  margin-left: 10px;
`;
const NameText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
`;
const SubText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`;
const AddCollectionSection = styled.View`
  display: flex;
  flex-direction: row;
  padding: 12.5px 10px;
  align-items: center;
`;
const AddBtn = styled.TouchableOpacity`
  padding: 10px;
  margin-right: 15px;
`;
const AddImgBtn = styled.Image`
  height: 15px;
  width: 15px;
`;
const AddTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  color: #333333;
`;

const DropSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 4px 8px 12.5px;
  background: rgba(242, 165, 74, 0.1);
`;
const DropBtn = styled(AddBtn)``;
const DropImgBtn = styled(AddImgBtn)`
  height: 5px;
  width: 10px;
`;
const DropText = styled.Text`
  flex: auto;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  text-transform: uppercase;
  color: #333333;
`;

const DropEditBtn = styled(AddBtn)`
  margin-right: 0;
`;

const DropEditText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #f2a54a;
`;
const ListSection = styled.ScrollView`
  overflow: hidden;
  flex: auto;
`;
const ItemSection = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
`;
const ItemIc = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: 20px;
`;
const ItemText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  height: 16px;
  color: #333333;
`;
const ItemInputSection = styled.View<{topPadding?: number | string}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${props => props.topPadding}px 20px;
`;
const ItemInput = styled.TextInput`
  flex: auto;
  padding: 0;
  margin: 0;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
`;
const DeleteBtn = styled.TouchableOpacity``;
const DeleteIc = styled.Image`
  height: 16px;
  width: 16px;
`;
