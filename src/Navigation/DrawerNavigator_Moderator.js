import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {colors} from '../GlobalStyle/styles'
import {Icon} from 'react-native-elements'
import DrawerContent from '../Components/DrawerContent'
import Home_Moderator from '../Screens/Moderator/Home_Moderator'


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
                    title: 'Business console',
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