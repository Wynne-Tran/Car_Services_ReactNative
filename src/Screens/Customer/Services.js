import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'



const Services = ({navigation}) => {

    return (
        <ImageBackground source={require('../../../assets/images/bgCar.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Services"/>

                <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 30}}>
                    <TouchableOpacity
                       
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/full.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    

                </View>

                

                <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 20}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{marginBottom: 40, marginLeft: 15,width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/wash.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{marginBottom: 40,width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/road.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    

                </View>

                

                <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 20}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{marginLeft: -5,width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/Elec.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{marginRight: -15,width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/repair.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    

                </View>

                <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 20}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{marginTop: 40, marginLeft: 15,width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/tire.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{marginTop: 40, marginRight: 10,width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground source={require('../../../assets/images/care.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    

                </View>

                <View style={{flexDirection:'row', justifyContent: 'space-around', marginTop: -20}}>
                    <TouchableOpacity
                    
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground   style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Booking")}
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent", marginTop:10}}>
                            <ImageBackground source={require('../../../assets/images/oil.png')}  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    
                    >
                        <View style = {{width: 120, height: 100, backgroundColor: "transparent"}}>
                            <ImageBackground  style={styles.background}> 
                                <Text></Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    

                </View>

                
                    
            </View>
        </ImageBackground>
    )
}

export default Services

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    background:{
        flex: 1, 
        width: "100%", 
        justifyContent: 'center', 
        backgroundColor: 'transparent', 
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



                    
