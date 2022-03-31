// @ts-ignore
import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';

const Container = styled.View`
  flex: 1;
  margin-top: 8px;
  padding: 11px 11px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

const STextInput = styled.TextInput`
  margin: 0;
  padding: 0;
  flex: 1;
  font-weight: 400;
  font-size: 15px;
`;

interface Props extends TextInputProps {
  title: string;
  keyName: string;
  onChangeValue: (keyName: string, value: string) => void;
}

export const InputNormal = memo(function InputNormal(props: Props) {
  const {title, keyName, onChangeValue, ...restProps} = props;

  const onChangeText = useCallback(
    (val: string) => {
      onChangeValue(keyName, val);
    },
    [onChangeValue, keyName],
  );

  return (
    <Container>
      <STextInput
        {...restProps}
        placeholder={title}
        onChangeText={onChangeText}
      />
    </Container>
  );
});
