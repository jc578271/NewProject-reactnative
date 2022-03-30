import * as React from "react";
import {memo, useCallback, useEffect, useState} from "react";
import {Platform, StatusBar} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styled from "styled-components/native";
import {IC_BACK} from "../assets";
import {StatusBarSection} from "./Header"
import {useCollections} from "../store";
import {RawCollection} from "../types";

const CollectionHeader = ({ routeParent, navigation }) => {
    const insets = useSafeAreaInsets()
    const collections = useCollections()
    const [itemCollection, setItemCollection] = useState<RawCollection>({
        id: "", title: "", list: []
    })
    useEffect(() => {
        let newList = [...collections]
        setItemCollection(newList.find(item => item.id == routeParent.params?.id))
    }, [collections, routeParent.params?.id])

    const onPressBack = useCallback(() => {
        navigation.goBack()
    }, [])
    return (
        <>
        <StatusBarSection height={Platform.OS == "ios" ? insets.top: StatusBar.currentHeight}/>
        <Container>
            <BackBtn onPress={onPressBack}>
                <BackIc source={IC_BACK}/>
            </BackBtn>
            <TitleSection>
                <TitleText>{itemCollection?.title}</TitleText>
                <TitleSubText>{itemCollection?.list.length} members</TitleSubText>
            </TitleSection>
            <Sth/>
        </Container>
        </>
    )
}

export default memo(CollectionHeader)

const Container = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);;
`
const BackBtn = styled.TouchableOpacity``
const BackIc = styled.Image`
  width: 16px;
  height: 15px;
`
const TitleSection = styled.View`
  flex:auto;
  align-items: center;
`
const TitleText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */

  text-align: center;
  letter-spacing: -0.41px;

  /* Gray 1 */

  color: #333333;`
const TitleSubText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  /* identical to box height, or 169% */

  text-align: center;
  letter-spacing: -0.41px;

  /* Gray 3 */

  color: #828282;`
const Sth = styled.View`
  width: 24px
`