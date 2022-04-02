// @ts-ignore
import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';
import {IC_GREEN_ADD, IC_RED_DELETE} from '../assets';
// @ts-ignore
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props extends TextInputProps {
  title: string;
  keyName: string;
  list: string[];
  config: any;
  setParams: (prev: any) => void;
  setConfig: (prev: any) => void;
}

export const InputWithArray = memo(function InputWithArray(props: Props) {
  const {title, keyName, list, config, setParams, setConfig, ...restProps} =
    props;

  const infoDeleteOnPress = useCallback(
    (index: number, keyName: string) => {
      setParams(prev => {
        let newList = [...prev[keyName]];
        newList.splice(index, 1);
        setConfig(editingPrev => ({
          ...editingPrev,
          [keyName]: {...editingPrev[keyName], id: newList.indexOf('')},
        }));
        return {...prev, [keyName]: newList};
      });
    },
    [config, keyName, list],
  );

  const infoOnChange = useCallback(
    (index: number, text: string, keyName: string) => {
      setParams(prev => {
        let newList = [...prev[keyName]];
        newList[index] = text;
        return {...prev, [keyName]: newList};
      });
    },
    [keyName, list],
  );

  const addInfoOnPress = useCallback(
    (keyName: string) => {
      setParams(prev => {
        let newList = [...prev[keyName]];
        if (keyName != 'birthday') {
          newList.push('');
        }
        setConfig(editPrev => ({
          ...editPrev,
          [keyName]: {
            ...editPrev[keyName],
            id: newList.indexOf(''),
            isEditing: true,
          },
        }));
        return {...prev, [keyName]: newList};
      });
    },
    [config, keyName, list],
  );

  const onDateConfirm = useCallback(
    (date, index) => {
      setConfig(prev => ({
        ...prev,
        birthday: {...prev.birthday, isEditing: false},
      }));
      setParams(prev => {
        let newList = [...prev.birthday];
        newList[index] = moment(date).valueOf();
        return {...prev, birthday: newList};
      });
    },
    [config, keyName, list],
  );

  const onDateCancel = useCallback(() => {
    setConfig(prev => {
      return {
        ...prev,
        birthday: {...prev.birthday, isEditing: false},
      };
    });
  }, [config, keyName]);

  const contextOnPress = useCallback(
    (index: number, keyName: string) => {
      setConfig(prev => ({
        ...prev,
        [keyName]: {
          ...prev[keyName],
          id: index,
          isEditing: true,
        },
      }));
    },
    [config, keyName],
  );

  return (
    <Container isDateInput={keyName == 'birthday' && list.length != 0}>
      {list.map((item, index) => {
        const {isEditing, id, typeKeyboard} = config;
        return (
          <EditSection key={index}>
            <DeleteBtn onPress={() => infoDeleteOnPress(index, keyName)}>
              <DeleteIc source={IC_RED_DELETE} />
            </DeleteBtn>
            {(keyName != 'birthday' && isEditing && id == index) ||
            list[index] == '' ? (
              <EditTextInput
                autoFocus={true}
                keyboardType={typeKeyboard}
                placeholder={`add ${keyName}`}
                value={list[index]}
                onFocus={() => contextOnPress(index, keyName)}
                onChangeText={text => infoOnChange(index, text, keyName)}
              />
            ) : (
              <ContextButton onPress={() => contextOnPress(index, keyName)}>
                <ContextText>
                  {keyName == 'birthday'
                    ? moment(list[index]).format('Do MMM YYYY')
                    : list[index]}
                </ContextText>
              </ContextButton>
            )}
          </EditSection>
        );
      })}
      {(keyName != 'birthday' || list.length == 0) && (
        <AddGroup onPress={() => addInfoOnPress(keyName)}>
          <AddBtn>
            <AddIc source={IC_GREEN_ADD} />
          </AddBtn>
          <AddText>{title}</AddText>
        </AddGroup>
      )}

      {config.isEditing && keyName == 'birthday' && (
        <DateTimePickerModal
          date={moment(list[0]).toDate()}
          isVisible={config.isEditing}
          mode="date"
          onConfirm={date => onDateConfirm(date, 0)}
          onCancel={() => onDateCancel()}
        />
      )}
    </Container>
  );
});
const Container = styled.View<{isDateInput?: boolean}>`
  flex: 1;
  padding: 34px 0 10px 0;
  border-bottom-width: ${props => (props.isDateInput ? '0' : '0.5')}px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const AddGroup = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 10px;
`;
const AddText = styled.Text`
  flex: 1;
  padding: 0;
  margin: 0 0 0 16px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-transform: lowercase;
  color: #333333;
`;
const AddBtn = styled.View``;

const AddIc = styled.Image`
  height: 24px;
  width: 24px;
`;

const EditSection = styled.View`
  flex-direction: row;
  padding: 10px 0 10px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  align-items: center;
`;
const DeleteBtn = styled.TouchableOpacity``;
const DeleteIc = styled.Image``;
const ContextButton = styled.TouchableOpacity`
  flex: auto;
  margin-left: 16px;
`;
const ContextText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  color: #2f80ed;
`;
const EditTextInput = styled.TextInput`
  padding: 0;
  margin: 0 0 0 16px;
  font-weight: 400;
  font-size: 15px;
  flex: 1;
`;
