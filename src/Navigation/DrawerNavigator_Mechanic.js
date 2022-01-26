import React, {useState, useEffect} from 'react'
import { StyleSheet} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {colors} from '../GlobalStyle/styles'
import {Icon} from 'react-native-elements'
// Mechanic
import DrawerContent_Mechanic from '../Components/DrawerContent_Mechanic'
import Home_Mechanic from '../Screens/Mechanic/Home_Mechanic'


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

            


            </Drawer.Navigator>

            
    )
}

export default DrawerNavigator_Mechanic

const styles = StyleSheet.create({})
