import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import {colors, parameters } from '../GlobalStyle/styles'
import {Icon} from 'react-native-elements'



const HomeHeader = ({navigation, role}) => {
    return (
        <View style={styles.header}>
            <View style = {{alignItems : "center", justifyContent:'center', marginLeft: 15}}>
                <Icon
                    type = "material-community"
                    name = 'arrow-left'
                    color = {colors.cardbackground}
                    size = {32}
                    onPress = {() => {
                        navigation.goBack()
                    }}
                />
            </View>

            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: colors.cardbackground, fontSize: 25, fontWeight: 'bold'}}>{role}</Text>
            </View>

            <View style = {{alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                <Icon 
                    type = "material-community"
                    name = "menu"
                    size = {35}
                    color = {colors.cardbackground}
                    onPress = {() => {
                        navigation.toggleDrawer()
                    }}
                />
            </View>
            
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    header: {
        paddingTop: 25,
        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height: 80,
        justifyContent: 'space-between',
    }
})
