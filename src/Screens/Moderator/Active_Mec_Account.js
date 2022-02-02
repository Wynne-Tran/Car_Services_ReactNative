import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image, ScrollView  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {Avatar} from 'react-native-elements'
import {Button} from 'react-native-elements'
import {db} from '../../../firebase'
import {updateDoc, doc} from  '@firebase/firestore'

const Home_Moderator = ({navigation}) => {

    const mechanic = route.params.data.filter(x => x.id == route.params.id)

    const handleActive = async(id) => {
        
    }
    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Active Account"/>
    
                <View style={styles.avatarFrame}>
                    <Avatar 
                        rounded
                        avatarStyle = {styles.avatar}
                        size = {85}
                        //source ={}
                        />
                </View>

                    <View style={{marginTop: 50}}>
                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50, fontWeight:'bold', color:'black', fontSize:20}}>Full Name: </Text>
                            <Text style = {{marginLeft: 100,color:'black', fontSize:20}}></Text>
                        </View>

                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50,fontWeight:'bold', color:'black', fontSize:20}}>Username: </Text>
                            <Text style = {{marginLeft: 100,color:'black', fontSize:20}}></Text>
                        </View>

                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50, fontWeight:'bold', color:'black', fontSize:20}}>Phone: </Text>
                            <Text style = {{marginLeft: 100,color:'black', fontSize:20}}></Text>
                        </View>

                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50, fontWeight:'bold', color:'black', fontSize:20}}>Address: </Text>
                            <Text style = {{marginLeft: 100,color:'black', fontSize:20}}></Text>
                        </View>

                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50,fontWeight:'bold', color:'black', fontSize:20}}>Job Title: </Text>
                            <Text style = {{marginLeft: 100,color:'black', fontSize:20}}></Text>
                        </View>

                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50, fontWeight:'bold', color:'black', fontSize:20}}>Experience: </Text>
                            <Text style = {{marginLeft: 100,color:'black', fontSize:20}}></Text>
                        </View>

                        <View style = {{flexDirection: 'row', marginVertical: 10}}>
                            <Text style={{marginLeft: 50,fontWeight:'bold', color:'black', fontSize:20}}>Salary: </Text>
                            <Text style = {{marginLeft: 100, color:'black', fontSize:20}}>$/hour</Text>
                        </View>

                        

                </View>
                    <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                        
                        <Button 
                            title = "Active"
                            buttonStyle = {styles.buttonSignIn}
                            titleStyle = {parameters.buttonTitle}
                            onPress={() => navigation.navigate("Home_Moderator")}
                            
                        />
                    </View> 
                
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
    card: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
    },
    message:{
        backgroundColor: colors.Card_DarkBlue,
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 260,
        marginTop: 5
    },
    announment:{
        backgroundColor: 'transparent',
        width: "90%",
        marginLeft: "5%",
        height: 70,
        marginTop: 20,
        flexDirection: 'row',
        borderBottomColor: colors.Card_DarkGrey,
        borderBottomWidth: 1,
        
    },
    avatarFrame:{
        alignItems: 'center',
        justifyContent: 'center'

    },
    greeting: {
        flex: 3, 
        marginTop: 5,
        borderColor: 'white',
        borderRadius: 15,
        width: '90%',
        height: 100,
        backgroundColor: "#b8b5ff",
        opacity: 0.6,
        marginLeft: "5%",
        marginBottom: 20,
        paddingTop: 30
    
    },
    buttonSignIn: {
        backgroundColor: colors.Card_LightViolet,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.Card_LightViolet,
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
