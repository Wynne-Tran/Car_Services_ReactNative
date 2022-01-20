import React from 'react'
import { StyleSheet} from 'react-native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import Landing from '../Screens/AuthScreen/Landing'
import Register from '../Screens/AuthScreen/Register';
import SignIn from '../Screens/AuthScreen/SignIn';
import RegisterForm from '../Screens/AuthScreen/RegisterForm';
import Home_Moderator from '../Screens/Home_Moderator'
import DrawerNavigator from '../Navigation/DrawerNavigator'

const AuthStack = createStackNavigator();

const AuthNavigators = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name = "Landing"
                component = {Landing}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "Register"
                component = {Register}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "RegisterForm"
                component = {RegisterForm}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />


            <AuthStack.Screen 
                name = "SignIn"
                component = {SignIn}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "Home_Moderator"
                component = {Home_Moderator}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "DrawerNavigator"
                component = {DrawerNavigator}
                options = {{

                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            
            
        </AuthStack.Navigator>
    )
}

export default AuthNavigators

const styles = StyleSheet.create({})
