import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image, Alert  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors} from '../../GlobalStyle/styles'
import {Avatar, Icon} from 'react-native-elements'

import { ScrollView } from 'react-native-gesture-handler'

const Home_Mechanic = ({navigation}) => {

    

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
                        <View style = {{flexDirection: 'column', alignItems: 'center', marginTop: -20}}>
                            
                            <View>
                            {
                                <Avatar 
                                rounded
                                avatarStyle = {styles.avatar}
                                size = {65}
                                //source = {{}}
                                />
                            }
                            
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.text_white, fontSize:30}}>username</Text>
                                <Text style = {{color: colors.text_white, fontSize:14}}>email</Text>
                            </View>
                            
                        </View>
                        
                        <View style={{alignItems: 'center'}}>
                            <Text style = {{color: colors.text_white, fontSize:18, marginTop: 10, marginHorizontal: 10}}>
                                You serviced <Text style={{fontSize: 25, fontWeight: 'bold', color:'red'}}>0</Text> customers !
                            </Text>
                        </View>
                    </View>

                    
                </View>

                <View style = {{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity style = {{marginVertical: 5, backgroundColor: colors.Card_Orange, height: 100, width: '40%', borderRadius: 15, paddingLeft: 10}}
                        
                    >
                        <View style={styles.card}>
                            <View style = {{alignItems : "center", justifyContent:'center'}}>
                                <Image style={{flex: 1,paddingLeft: 30, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Calendar.png')}/>
                            </View>

                            <View style = {{ alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                                    <Icon 
                                        type = "material-community"
                                        name = "lock"
                                        size = {30}
                                        color = {colors.cardbackground}
                                    />
                                </View>
                        </View>
                        <View>
                            <Text style={{color: colors.text_blue, fontSize: 16, fontWeight: 'bold'}}>Find Task</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style = {{marginVertical: 5, backgroundColor: colors.Card_Black, height: 100, width: '40%', borderRadius: 15, paddingLeft: 10}}
                        
                    >
                        <View style={styles.card}>
                            <View style = {{alignItems : "center", justifyContent:'center'}}>
                                <Image style={{flex: 1,paddingLeft: 30, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Calculate.png')}/>
                            </View>

                            <View style = {{ alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                                    <Icon 
                                        type = "material-community"
                                        name = "lock"
                                        size = {30}
                                        color = {colors.Card_Orange}
                                    />
                                </View>
                        </View>
                        <View>
                            <Text style={{color: colors.text_orange, fontSize: 16, fontWeight: 'bold'}}>History Task</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style = {{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    
                    <TouchableOpacity style = {{marginVertical: 5, backgroundColor: colors.Card_DarkGrey, height: 100, width: '40%', borderRadius: 15, paddingLeft: 10}}
                        
                    >
                        <View style={styles.card}>
                            <View style = {{alignItems : "center", justifyContent:'center'}}>
                                <Image style={{flex: 1,paddingLeft: 30, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Calculate.png')}/>
                            </View>

                            <View style = {{ alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                                    <Icon 
                                        type = "material-community"
                                        name = "lock"
                                        size = {30}
                                        color = {colors.Card_Orange}
                                    />
                                </View>
                        </View>
                        <View>
                            <Text style={{color: colors.text_orange, fontSize: 16, fontWeight: 'bold'}}>History Earns</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style = {{marginVertical: 5, backgroundColor: colors.Card_LightGrey, height: 100, width: '40%', borderRadius: 15, paddingLeft: 10}}
                      
                    >
                        <View style={styles.card}>
                            <View style = {{alignItems : "center", justifyContent:'center'}}>
                                <Image style={{flex: 1,paddingLeft: 30, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Accurate.png')}/>
                            </View>

                            <View style = {{ alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                                    <Icon 
                                        type = "material-community"
                                        name = "lock"
                                        size = {30}
                                        color = {colors.cardbackground}
                                    />
                                </View>
                        </View>
                        <View>
                            <Text style={{color: colors.text_blue, fontSize: 20, fontWeight: 'bold'}}>Feedback</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View >
                    <Text style={{color: colors.text_black, fontSize: 30, fontWeight: 'bold', marginLeft: 15}}>Messages</Text>
                </View>

                <View style={styles.announment}>
                    <ScrollView style={{padding: 10}}>
                    <View style={styles.message_red}>
                            <ImageBackground source={require('../../../assets/images/message_red.png')}  style={styles.background2}>
                                <Text style={{color: colors.text_white, fontWeight: 'bold', marginLeft: '20%', fontSize: 18}}>Edit your profile to access the application !</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.message_red}>
                            <ImageBackground source={require('../../../assets/images/message_red.png')}  style={styles.background2}>
                                <Text style={{color: colors.text_white, fontWeight: 'bold', marginLeft: '20%', fontSize: 18}}>Mod will review your application !</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.message_red}>
                            <ImageBackground source={require('../../../assets/images/green_note.png')}  style={styles.background2}>
                                <Text style={{color: colors.text_white, fontWeight: 'bold', marginLeft: '20%', fontSize: 18}}>Congratualtion! You can find you task now !</Text>
                            </ImageBackground>
                        </View>

                        
                    </ScrollView>
                </View>
                
            </View>
        </ImageBackground>
    )
}

export default Home_Mechanic

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
        height: 230,
        marginTop: 20,
        marginBottom: 20
    },
    editButton: {
        width:80, 
        height: 35, 
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
        borderColor: colors.Card_DarkBlue,
        borderStyle: 'dashed',
        borderWidth: 2,
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 140,
        marginTop: 20,
        
    },
    message_red: {
        width: '100%',
        height: 60,
    }
})
