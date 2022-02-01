import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, TextInput, ScrollView, Alert} from 'react-native';
import {colors, parameters} from "../../GlobalStyle/styles";
import { role } from '../../Screens/AuthScreen/Register'
import { Icon, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'

import {Formik} from 'formik'
import { auth } from '../../../firebase';



export default function SignIn ({navigation}) {
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(()=> {
       const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                
            }
            

        })
        return unsubscribe;
    },[])
   
    const[textInput2Fossued, setTextInput2Fossued] = useState(false)

    const handleLogin = () => {
        try{
            auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with : ', user.email)
        })
        .catch(error => alert(error.message));
        }   catch(err){
            alert(err)
        }
    }

    return (
        <ImageBackground source={require('../../../assets/images/Landing.png')}  style={styles.background}>
            <ScrollView style={styles.container}>
                <StatusBar style="auto" />
                <Formik >
                    { (props)=>(
                <View style = {styles.greeting}>
                    <Text style = {{fontSize:36, color: colors.text_white, fontWeight:'bold', marginLeft: "30%", }}>Log In</Text>
                    <View style = {{marginTop: 10}}>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Email'
                            placeholderTextColor = {colors.text_white}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                    <View style = {styles.TextInput2}>
                        <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                            <Icon 
                                name="lock"
                                iconStyle = {{color:colors.grey3}}
                                type = "material"
                                styles = {{}}
                            />
                        </Animatable.View>
                        <TextInput 
                                style = {{width: "80%", color: colors.text_white}}
                                placeholder='Password'
                                placeholderTextColor = {colors.text_white}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                onFocus={() => {
                                    setTextInput2Fossued(false)
                                }}
                                onBlur={() => {
                                    setTextInput2Fossued(true)
                                }}
                                
                            />
                        <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                            <Icon 
                                name="visibility-off"
                                iconStyle = {{color:colors.grey3}}
                                type = "material"
                                style = {{marginRight: 10}}
                            />
                        </Animatable.View>
                    </View>


                    <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                        <Button 
                            title = "Cancel"
                            buttonStyle = {styles.buttonCancel}
                            titleStyle = {parameters.buttonTitle}
                            onPress = {() => {navigation.goBack()}}
                        />
                        <Button 
                            title = "LogIn"
                            buttonStyle = {styles.buttonSignIn}
                            titleStyle = {parameters.buttonTitle}
                            onPress={() => handleLogin()}
                            
                        />
                    </View>

                    <View style = {{alignItems: "center", marginTop: 20}}>
                        <Text style = {{...styles.text1, textDecorationLine: "underline"}}>Forgot Password ?</Text>
                    </View>

                    <View style = {{marginTop: 20, marginBottom: 20}}>
                        <Text style = {{fontSize: 18, marginLeft: 20}}>LogIn with</Text>
                    </View>
                    
                </View>    
                </View>)}
                </Formik>
            
            </ScrollView>
       </ImageBackground>
       

    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    background:{
        flex: 1, 
        width: "100%", 
        justifyContent: 'center', 
        backgroundColor: 'black', 
        resizeMode: 'cover'
    },
    greeting: {
        flex: 3, 
        marginTop: 300,
        borderColor: 'white',
        borderRadius: 15,
        width: '90%',
        backgroundColor: "#ffffff40",
        marginLeft: "5%",
        marginBottom: 20
       
    },
    button: {
        
        borderColor: "#1B82A3",
        height: 65,
        width: '80%',
        marginLeft: "10%",
        backgroundColor: "transparent",
        fontWeight: 'bold'
    },

    text1:{
        color:colors.grey3,
        fontSize:16
    },

    TextInput1:{
        borderWidth:2,
        borderColor:colors.text_white,
        color: colors.text_white,
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15,
        height: 45
      },

      TextInput2:{
        borderWidth:2,
         borderRadius:12,
         marginHorizontal:20,
         borderColor: colors.text_white,
         flexDirection:"row",
         justifyContent:"space-between",
         alignContent:"center",
         alignItems:"center",
         paddingLeft:15,
         height: 45
  
      },

      SocialIcon :{
        borderRadius :12,
        height:50
      },

      createButton:{
        backgroundColor:"white",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:12,
        borderWidth:1, 
        borderColor:"#ff8c52",
        height:40,
        paddingHorizontal:20,
      },

      createButtonTitle:{
        color:"#ff8c52",
        fontSize:16,  
        fontWeight:"bold" ,
        alignItems:"center",
        justifyContent:"center"  ,
        marginTop:-3
      },
      buttonCancel: {
        backgroundColor: colors.button_green,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_green,
        height: 50,
        fontWeight: 'bold'
      },
      buttonSignIn: {
        backgroundColor: colors.button_violet,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        fontWeight: 'bold'
      }
    
 
})