// @ts-ignore
import React, {memo} from "react";
import {Text} from "react-native";
import CollectionHeader from "../components/CollectionHeader";
import CollectionFooter from "../components/CollectionFooter";
import styled from "styled-components/native";

const Collections = ({ route, navigation }:any) => {
    // console.log(navigation)
    return (
        <>
            <CollectionHeader
                routeParent={route}
                navigation={navigation}
            />
            <Container>
                <Text>Collection</Text>
            </Container>
            <CollectionFooter/>
        </>

    )
}

export default memo(Collections)

const Container = styled.ScrollView`
  flex: auto;
  background-color: #ffffff;
`