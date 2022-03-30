// @ts-ignore
import React, {memo, useCallback} from "react";
import {Platform, StatusBar} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styled from "styled-components/native";
import {IC_CAM, IC_MENU} from "../assets";


const Header = ({ route, navigation }: any) => {
    const insets = useSafeAreaInsets()
    const menuOnPress = useCallback(() => {
        navigation.openDrawer()
    }, [])
    return (
        <>
        <StatusBarSection height={Platform.OS == "ios" ? insets.top: StatusBar.currentHeight}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
        </StatusBarSection>
        <Container>
            <MenuBtn
                onPress={menuOnPress}
            >
                <MenuImg source={IC_MENU} />
            </MenuBtn>
            <Section1>
                <Title>{route.params?.title || route.name}</Title>
            </Section1>
            <CamBtn>
                <CamImg source={IC_CAM} />
            </CamBtn>
        </Container>
        </>
    )
}

export default memo(Header)

export const StatusBarSection = styled.View<{height?:string|number}>`
  background-color: #FFFFFF;
  height: ${props => props.height}px;
`

const Container = styled.View`
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
`
const MenuBtn = styled.TouchableOpacity`
    height: 24px;
    width: 24px;
`
const MenuImg = styled.Image`
`
const Section1 = styled.View`
    flex: auto;
    align-items: center;
`
const Title = styled.Text`
    font-weight: 500;
    font-size: 24px;

    letter-spacing: -0.41px;

    /* Gray 1 */

    color: #333333;
`
const CamBtn = styled(MenuBtn)`

`
const CamImg = styled(MenuImg)`

`