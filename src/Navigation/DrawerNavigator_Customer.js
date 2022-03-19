import React, {useState, useEffect} from 'react'
import { StyleSheet} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {colors} from '../GlobalStyle/styles'
import {Icon} from 'react-native-elements'
// Customer
import DrawerContent_Customer from '../Components/DrawerContent_Customer'
import Home_Customer from '../Screens/Customer/Home_Customer'
import Edit_Profile from '../Screens/Customer/Edit_Profile'
import Change_Password from '../Screens/Customer/Change_Password'
import Services from '../Screens/Customer/Services'
import Booking from '../Screens/Customer/Booking'
import Checkout from '../Screens/Customer/Checkout'
import Confirm_Message from '../Screens/Customer/Confirm_Message'
import History_Services from '../Screens/Customer/History_Services'
import History_Detail from '../Screens/Customer/History_Detail'
import Feedback from '../Screens/Customer/Feedback'
import Confirm_Feedback from '../Screens/Customer/Confirm_Feedback'


const Drawer = createDrawerNavigator()
const DrawerNavigator_Customer = () => {


    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent_Customer {...props} /> }
        >

            <Drawer.Screen 
                name = "Home_Customer"
                component = {Home_Customer}
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
                name = "Change_Password"
                component = {Change_Password}
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
                name = "Services"
                component = {Services}
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
                name = "Booking"
                component = {Booking}
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
                name = "Checkout"
                component = {Checkout}
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
                name = "Confirm_Message"
                component = {Confirm_Message}
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
                name = "History_Services"
                component = {History_Services}
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
                name = "History_Detail"
                component = {History_Detail}
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
                    name = "Feedback"
                    component = {Feedback}
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
                    name = "Confirm_Feedback"
                    component = {Confirm_Feedback}
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


            </Drawer.Navigator>

            
    )
}

export default DrawerNavigator_Customer

const styles = StyleSheet.create({})
