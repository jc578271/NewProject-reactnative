// @ts-ignore
import React, {memo} from "react";
import {Platform} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styled from "styled-components/native";
import {FooterSection} from "./Footer"

const CollectionFooter = () => {
    const insets = useSafeAreaInsets()
    return (
        <>
        <Container>
            {/*<ItemSection*/}
        </Container>
        <FooterSection height={Platform.OS == "ios" ? insets.bottom + 10 : 10}/>
        </>
    )
}

export default memo(CollectionFooter)

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 0;
`