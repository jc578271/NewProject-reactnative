// @ts-ignore
import React, {memo} from 'react';
import styled from 'styled-components/native';
import {FooterSection} from './Footer';

const CollectionFooter = () => {
  return (
    <>
      <Container>{/*<ItemSection*/}</Container>
      <FooterSection/>
    </>
  );
};

export default memo(CollectionFooter);

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 0;
`;
