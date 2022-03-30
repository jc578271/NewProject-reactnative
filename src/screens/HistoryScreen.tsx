// @ts-ignore
import React, {memo} from "react";
import {IC_MISS_CALL, IC_MORE_INFO} from "../assets"
import styled from "styled-components/native";

const HistoryScreen = () => {
    return (
        <Container>
            <HistoryItem>
                <StatusIcon source={IC_MISS_CALL}/>
                <Section1>
                    <ContactName>Nguyen Le Hoang</ContactName>
                    <ContactNumber>0123456788</ContactNumber>
                </Section1>
                <TimeText>Today</TimeText>
                <MoreInfoBtn>
                    <MoreInfoIc source={IC_MORE_INFO}/>
                </MoreInfoBtn>
            </HistoryItem>

            <HistoryItem>
                <StatusIcon source={IC_MISS_CALL} />
                <Section1>
                    <ContactName>Nguyen Le Hoang</ContactName>
                    <ContactNumber>0123456788</ContactNumber>
                </Section1>
                <TimeText>Today</TimeText>
                <MoreInfoBtn>
                    <MoreInfoIc source={IC_MORE_INFO} />
                </MoreInfoBtn>
            </HistoryItem>

            <HistoryItem>
                <StatusIcon source={IC_MISS_CALL} />
                <Section1>
                    <ContactName>Nguyen Le Hoang</ContactName>
                    <ContactNumber>0123456788</ContactNumber>
                </Section1>
                <TimeText>Today</TimeText>
                <MoreInfoBtn>
                    <MoreInfoIc source={IC_MORE_INFO} />
                </MoreInfoBtn>
            </HistoryItem>
        </Container>
    )
}

export default memo(HistoryScreen)

const Container = styled.ScrollView`
    background-color: #FFFFFF;
    flex:auto;
    padding-left: 16px;
`
const HistoryItem = styled.TouchableOpacity`
    padding: 12px 16px 12px 0;
    flex-direction: row;
    border-bottom-width: 0.5px;
    border-bottom-color: rgba(0, 0, 0, 0.1);;
`
const Section1 = styled.View`
    flex:auto
`
const ContactName = styled.Text`
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */
    letter-spacing: 0.12px;

    color: #333333;
`
const ContactNumber = styled.Text`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */

    letter-spacing: 0.12px;

    /* Gray 3 */

    color: #828282;
`
const StatusIcon = styled.Image`
    height: 20px;
    width: 20px;
    margin-right: 16px;
`
const TimeText = styled.Text`
    align-self: center;
    margin-right: 30px;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    /* or 123% */

    letter-spacing: 0.12px;

    /* Gray 3 */

    color: #828282;
`
const MoreInfoBtn = styled.TouchableOpacity`
    align-self: center;
`
const MoreInfoIc = styled.Image`
    height: 24px;
    width: 24px;
` 