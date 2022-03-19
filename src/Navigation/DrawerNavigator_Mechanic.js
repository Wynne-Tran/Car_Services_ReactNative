import React, {useState, useEffect} from 'react'
import { StyleSheet} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {colors} from '../GlobalStyle/styles'
import {Icon} from 'react-native-elements'
// Mechanic
import DrawerContent_Mechanic from '../Components/DrawerContent_Mechanic'
import Home_Mechanic from '../Screens/Mechanic/Home_Mechanic'
import Edit_Profile from '../Screens/Mechanic/Edit_Profile'
import Change_Password from '../Screens/Mechanic/Change_Password'
import Find_Tasks from '../Screens/Mechanic/Find_Tasks'
import Apply_Tasks from '../Screens/Mechanic/Apply_Tasks'
import Confirm_Message from '../Screens/Mechanic/Confirm_Message'
import History_Tasks from '../Screens/Mechanic/History_Tasks'
import Earns from '../Screens/Mechanic/Earns'
import Feedback from '../Screens/Mechanic/Feedback'

const Drawer = createDrawerNavigator()
const DrawerNavigator_Mechanic = () => {


    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent_Mechanic {...props} /> }
        >

            <Drawer.Screen 
                name = "Home_Mechanic"
                component = {Home_Mechanic}
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
                name = "Find_Tasks"
                component = {Find_Tasks}
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
                    name = "Apply_Tasks"
                    component = {Apply_Tasks}
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
                    name = "Confirm_Message"
                    component = {Confirm_Message}
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
                name = "History_Tasks"
                component = {History_Tasks}
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
                name = "History_Earns"
                component = {Earns}
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
                name = "Feedback"
                component = {Feedback}
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


            </Drawer.Navigator>

            
    )
}

export default DrawerNavigator_Mechanic

const styles = StyleSheet.create({})
