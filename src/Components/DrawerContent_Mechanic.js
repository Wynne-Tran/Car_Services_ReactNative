import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Linking, Pressable, Alert, Switch, ImageBackground} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import {Avatar,Icon, Button} from 'react-native-elements'
import {colors} from '../GlobalStyle/styles'



const DrawerContent_Mechanic = (props) => {

    

    return (
        <ImageBackground source={require('../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <DrawerContentScrollView {...props} >
                    <View style = {{backgroundColor: colors.buttons}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingVertical: 10}}>
                            <Avatar 
                                rounded
                                avatarStyle = {styles.avatar}
                                size = {85}
                                //source = {{}}
                            />
                            <View style = {{marginLeft:10}}>
                                <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.cardbackground, fontSize:24}}>Username</Text>
                                <Text style = {{color: colors.cardbackground, fontSize:14}}>Email</Text>
                            </View>
                        </View>

                        <View >
                            <Button 
                                title = "Edit Profile"
                                buttonStyle = {styles.buttonSignIn}
                                titleStyle = {styles.buttonTitle}
                            
                            />
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
        </ImageBackground>

    )
}

export default DrawerContent_Mechanic

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
    },
    background:{
        flex: 1, 
        width: "100%", 
        justifyContent: 'center', 
        backgroundColor: 'black', 
        resizeMode: 'cover',
     
    },
    buttonSignIn: {
        width: "45%", 
        alignItems: 'center', 
        marginLeft: "35%",
        borderRadius: 15,
        backgroundColor: colors.Card_DarkGrey,
        borderColor: colors.Card_DarkGrey,
        
      },
      buttonTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3,
        backgroundColor: colors.Card_DarkGrey,
        borderColor: colors.Card_DarkGrey,
        borderWidth: 0
    }
})
