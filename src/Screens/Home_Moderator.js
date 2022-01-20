import React from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground,  Pressable, Image, Dimensions  } from 'react-native'
import HomeHeader from '../Components/HomeHeader'




const Home_Moderator = ({navigation}) => {
    return (
        <ImageBackground source={require('../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

            <HomeHeader navigation={navigation} role = "Moderator"/>
        </View>
        </ImageBackground>
    )
}

export default Home_Moderator

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
})