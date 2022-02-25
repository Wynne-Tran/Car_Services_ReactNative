import React, {useState, useEffect} from 'react'
import { StyleSheet} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {colors} from '../GlobalStyle/styles'
import {Icon} from 'react-native-elements'

//here for Moderator
import DrawerContent from '../Components/DrawerContent'
import Home_Moderator from '../Screens/Moderator/Home_Moderator'
import Edit_Profile from '../Screens/Moderator/Edit_Profile'
import Change_Password from '../Screens/Moderator/Change_Password'
import View_Submission from '../Screens/Moderator/View_Submission'
import Approve_Submission from '../Screens/Moderator/Approve_Submission'
import Active_Mec_Account from '../Screens/Moderator/Active_Mec_Account'


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {


    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} /> }
        >

            <Drawer.Screen 
                name = "Home_Moderator"
                component = {Home_Moderator}
                options={{
                    headerShown: false,
                    title: 'Profile',
                    drawerIcon: ({focussed, size}) =>  (
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' : colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />

            <Drawer.Screen 
                name = "Edit_Profile"
                component = {Edit_Profile}
                options={{
                    headerShown: false,
                    title: 'Edit Profile',
                    drawerIcon: ({focussed, size}) =>  (
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' : colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />

            <Drawer.Screen 
                name = "Change_Password"
                component = {Change_Password}
                options={{
                    headerShown: false,
                    title: 'Change_Password',
                    drawerIcon: ({focussed, size}) =>  (
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' : colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />

            <Drawer.Screen 
                name = "View_Submission"
                component = {View_Submission}
                options={{
                    headerShown: false,
                    title: 'View_Submission',
                    drawerIcon: ({focussed, size}) =>  (
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' : colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />

            <Drawer.Screen 
                name = "Approve_Submission"
                component = {Approve_Submission}
                options={{
                    headerShown: false,
                    title: 'Approve_Submission',
                    drawerIcon: ({focussed, size}) =>  (
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' : colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />

            <Drawer.Screen 
                name = "Active_Mec_Account"
                component = {Active_Mec_Account}
                options={{
                    headerShown: false,
                    title: 'Oversea_Service',
                    drawerIcon: ({focussed, size}) =>  (
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' : colors.grey2}
                            size = {size}
                        />
                    )
                }}
            />



            </Drawer.Navigator>

            
    )
}

export default DrawerNavigator

const styles = StyleSheet.create({})
