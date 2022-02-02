import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image, TextInput  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {Button} from 'react-native-elements'



const Confirm_Message = ({navigation}) => {

    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Confirm Message"/>

                
                    <View style={styles.message}>
                    <ImageBackground source={require('../../../assets/images/Thank_Violet.png')} style={{width:'100%', height: "100%", resizeMode: 'cover'}}>
                        <View style = {{alignItems: 'center', justifyContent: 'center', padding: 30}}>
                            <Text style={{color: colors.text_white, fontSize: 30, fontWeight: 'bold'}}>Thank You !</Text>
                            <View style = {{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                                <Text style={{color: colors.text_white, fontSize: 20}}>
                                    Your booking is <Text styles={{fontSize: 16, fontWeight: 'bold'}}>date</Text>
                                </Text>
                            </View>
                        </View>
                        </ImageBackground>
                    </View>
                


                <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                    
                    <Button 
                        title = "Home"
                        buttonStyle = {styles.buttonSignIn}
                        titleStyle = {parameters.buttonTitle}
                        onPress={() => navigation.goBack()}
                        
                    />
                </View> 
            </View>
        </ImageBackground>
    )
}

export default Confirm_Message

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    background:{
        flex: 1, 
        width: "100%", 
        justifyContent: 'center', 
        backgroundColor: 'black', 
        resizeMode: 'cover'
    },
    card: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
    },
    message:{
        width: '90%',
        borderRadius: 20,
        marginLeft: "5%",
        height: 300,
        marginTop: 50
    },
    buttonSignIn: {
        backgroundColor: "#7868E6",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        width: 100,
        fontWeight: 'bold'
      },
      buttonTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3,
        

      },
      
})



                    
