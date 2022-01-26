import React from 'react'
import { StyleSheet, Text, View,} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import {Avatar,Icon} from 'react-native-elements'
import {colors} from '../GlobalStyle/styles'



const DrawerContent = (props) => {


    return (
        <View style = {styles.container}>
            <DrawerContentScrollView {...props} >
                <View style = {{backgroundColor: colors.buttons}}>
                    <View style = {{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingVertical: 10}}>
                        <Avatar 
                            rounded
                            avatarStyle = {styles.avatar}
                            size = {75}
                            source = {require('../../assets/images/None.jpeg')}
                        />
                        <View style = {{marginLeft:10}}>
                            <Text style={{fontWeight:'bold', color:colors.cardbackground, fontSize:18}}>John Mark</Text>
                            <Text style = {{color: colors.cardbackground, fontSize:14}}>email</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5}}>
                        <View style = {{flexDirection:'row', marginTop: 10}}>
                            <View style={{marginLeft: 10, alignItems: 'center', justifyContent:'center'}}>
                                <Text style = {{fontWeight: 'bold', color: colors.cardbackground, fontSize: 18}}>1</Text>
                                <Text style = {{color: colors.cardbackground, fontSize: 14}}>My Favorites</Text>
                            </View>
                        </View>

                        <View style = {{flexDirection:'row', marginTop: 10}}>
                            <View style={{marginLeft: 10, alignItems: 'center', justifyContent:'center'}}>
                                <Text style = {{fontWeight: 'bold', color: colors.cardbackground, fontSize: 18}}>0</Text>
                                <Text style = {{color: colors.cardbackground, fontSize: 14}}>My Cart</Text>
                            </View>
                        </View>
                    </View>
               
                </View>

                

                <DrawerItem 
                    label = "Home"
                    icon = {({color, size}) => (
                        <Icon 
                            type = "material-community"
                            name = "home"
                            color = {color}
                            size = {size}

                        />
                    )}
                />

                <DrawerItem 
                    label = "Approved Submission"
                    icon = {({color, size}) => (
                        <Icon 
                            type = "material-community"
                            name = "tag-heart"
                            color = {color}
                            size = {size}

                        />
                    )}
                />

                <DrawerItem 
                    label = "Earns"
                    icon = {({color, size}) => (
                        <Icon 
                            type = "material-community"
                            name = "piggy-bank"
                            color = {color}
                            size = {size}

                        />
                    )}
                />


                <DrawerItem 
                    label = "History Tasks"
                    icon = {({color, size}) => (
                        <Icon 
                            type = "material-community"
                            name = "server"
                            color = {color}
                            size = {size}

                        />
                    )}
                />

                <DrawerItem 
                    label = "Change Password"
                    icon = {({color, size}) => (
                        <Icon 
                            type = "material-community"
                            name = "shield-account"
                            color = {color}
                            size = {size}

                        />
                    )}
                />
                
            </DrawerContentScrollView>

            <DrawerItem 
                    style = {{marginBottom: 30}}
                    label = "Sign Out"
                    icon = {({color, size}) => (
                        <Icon 
                            type = "material-community"
                            name = "logout-variant"
                            color = {color}
                            size = {size}

                        />
                    )}
                    
                />
        </View>

    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    avatar: {
        borderColor: colors.pagebackground,
        
    },
    preferences : {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10, 
        paddingLeft: 20
    },
    SwitchText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darktheme: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10, 
        paddingLeft: 0,
        fontWeight: "bold",
    }
})