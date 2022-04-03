import React, {useState} from 'react'
import { StyleSheet} from 'react-native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import Landing from '../Screens/AuthScreen/Landing'
import Register from '../Screens/AuthScreen/Register';
import SignIn from '../Screens/AuthScreen/SignIn';
import RegisterForm from '../Screens/AuthScreen/RegisterForm';
import Home_Moderator from '../Screens/Moderator/Home_Moderator'
import DrawerNavigator_Moderator from './DrawerNavigator_Moderator'
import ForgotPassword from '../Screens/AuthScreen/ForgotPassword';
import DrawerNavigator_Mechanic from './DrawerNavigator_Mechanic';
import DrawerNavigator_Customer from './DrawerNavigator_Customer'
import Home_Mechanic from '../Screens/Mechanic/Home_Mechanic';
import Home_Customer from '../Screens/Customer/Home_Customer';
import ContactCustomerSupport from '../Components/ContactCustomerSupport'
import ContactMechanicSupport from '../Components/ContactMechanicSupport';


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
                name = "ForgotPassword"
                component = {ForgotPassword}
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
                name = "DrawerNavigator_Moderator"
                component = {DrawerNavigator_Moderator}
                options = {{

                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "DrawerNavigator_Mechanic"
                component = {DrawerNavigator_Mechanic}
                options = {{

                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "Home_Mechanic"
                component = {Home_Mechanic}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "DrawerNavigator_Customer"
                component = {DrawerNavigator_Customer}
                options = {{

                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />

            <AuthStack.Screen 
                name = "Home_Customer"
                component = {Home_Customer}
                options = {{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />
            <AuthStack.Screen 
                name = "Contact_Customer_Support"
                component = {ContactCustomerSupport}
                options = {{

                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid               
                }}
            />
            <AuthStack.Screen 
                name = "Contact_Mechanic_Support"
                component = {ContactMechanicSupport}
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
