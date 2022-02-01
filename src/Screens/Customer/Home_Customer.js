import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors} from '../../GlobalStyle/styles'
import {Avatar, Icon} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { assignWith } from 'lodash'
import { auth } from '../../../firebase'

const Home_Customer = ({navigation}) => {

    const handleSignOut = () => {
        try {
            auth.signOut()
            console.log('Logged out of user')
            navigation.navigate("SignIn")
        } catch(e){
            console.log(e)
        }
    }
    

    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Home"/>
    
                <View style={styles.message}>
                    <TouchableOpacity
                       
                    >
                        <View style={styles.editButton}>
                            <Text style ={{color: colors.text_white, fontWeight: 'bold'}}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View style = {{flexDirection: 'column', alignItems: 'center', marginTop: -28}}>
                            
                            <View>
                            <Avatar 
                                rounded
                                avatarStyle = {styles.avatar}
                                size = {65}
                                //source = {{}}
                            />
                            
                            </View>
                            <View>
                                <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.text_white, fontSize:30}}>username</Text>
                                <Text style = {{color: colors.text_white, fontSize:14}}>{auth.currentUser?.email}</Text>
                            </View>
                            
                        </View>
                        
                        <View style={{alignItems: 'center'}}>
                            <Text style = {{color: colors.text_white, fontSize:18, marginHorizontal: 10}}>
                                You requested <Text style={{fontSize: 25, fontWeight: 'bold', color:'red'}}>0</Text> services !
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.announment}>
                    <ImageBackground source={require('../../../assets/images/mini.png')}  style={styles.background2}>
                    </ImageBackground>
                </View>

                <View >
                    <Text style={{color: colors.text_black, fontSize: 30, fontWeight: 'bold', marginLeft: 15}}>Messages</Text>
                </View>

                <View style={styles.announment2}>
                    <ScrollView style={{padding: 10}}>
                        <View style={styles.message_red}>
                            <ImageBackground source={require('../../../assets/images/note_violet.png')}  style={styles.background2}>
                                <Text style={{color: colors.text_white, fontWeight: 'bold', marginLeft: '20%', fontSize: 18}}>Welcome username !</Text>
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={handleSignOut}>
                            <Text>Sign Out</Text>
                        </TouchableOpacity>
                        
                    </ScrollView>
                </View>
                
            </View>
        </ImageBackground>
    )
}

export default Home_Customer

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
    background2:{
        flex: 1, 
        width: "100%", 
        height: "auto",
        justifyContent: 'center', 
        backgroundColor: 'transparent', 
        resizeMode: 'cover',
        borderRadius: 12
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
        height: 210,
        marginTop: 20,
        marginBottom: 20
    },
    
    editButton: {
        width:80, 
        height: 40, 
        backgroundColor: colors.Card_Orange, 
        alignSelf:'flex-end', 
        borderRadius: 8, 
        marginTop: 15, 
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    announment:{
        backgroundColor: 'transparent',
        width: 380,
        height: 200,
        marginVertical: 20,
        justifyContent: 'center', 
        resizeMode: 'contain',
        
    
    },
    announment2:{
        backgroundColor: 'transparent',
        borderColor: colors.Card_DarkBlue,
        borderStyle: 'dashed',
        borderWidth: 2,
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 150,
        marginTop: 20,
        
    },
    message_red: {
        width: '100%',
        height: 60,
    }
})
