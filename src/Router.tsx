// @ts-ignore
import React, {memo, useEffect} from "react";
import LoginScreen from "./screens/LoginScreen";
import ContactScreen from "./screens/ContactScreen";
import {getFocusedRouteNameFromRoute, NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import HistoryScreen from "./screens/HistoryScreen";
import Footer from "./components/Footer";
import Header from "./components/Header"
import {SafeAreaProvider} from "react-native-safe-area-context";
import SideNav from "./components/SideNav";
import Collections from "./screens/Collections";
import AddEditContact from "./screens/AddEditContact";
import DetailContact from "./screens/DetailContact";
import {useAuth} from "./store";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabStack = ({ navigation, route, mainRoute }: any) => {
    return (
        <Tab.Navigator
            initialRouteName="ContactScreen"
            screenOptions={{
                header: props => <Header navigation={navigation} {...props} />
            }}
            tabBar={props => <Footer tabRoute={route} mainRoute={mainRoute} {...props} />}
        >
            <Tab.Screen name="ContactScreen" component={ContactScreen} />
            <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
        </Tab.Navigator>
    )
}

const MainStack = ({ route }) => {
    const auth = useAuth()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!auth?.userId ? <Stack.Screen name="LoginScreen" component={LoginScreen} />: null}
            <Stack.Group screenOptions={{presentation: "modal"}}>
                <Stack.Screen name="TabStack">
                    {props => <TabStack {...props} mainRoute={route} />}
                </Stack.Screen>
                <Stack.Screen name="AddContact" component={AddEditContact} />
            </Stack.Group>
            <Stack.Screen name="Collections" component={Collections} />
            <Stack.Screen name="DetailContact" component={DetailContact} />
            <Stack.Screen name="EditContact" component={AddEditContact} />
        </Stack.Navigator>
    )
}

const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="LoginScreen"
                    screenOptions={{ headerShown: false }}
                    drawerContent={props => <SideNav {...props} />}
                >
                    <Drawer.Screen options={({route}) => {
                        const routeName = getFocusedRouteNameFromRoute(route)
                        if (routeName != ("TabStack")) return {
                            swipeEnabled: false
                        }
                    }} name="MainStack" component={MainStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default memo(Router)