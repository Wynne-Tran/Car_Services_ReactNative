import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {colors, parameters} from "../../GlobalStyle/styles"
import { Icon, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
import {auth, db} from '../../../firebase'
import {Formik} from 'formik'
import {getAuth,sendPasswordResetEmail} from 'firebase/auth'



export default function ForgotPassword ({navigation}) {

    
    const [email,setEmail ] = useState();

        handleSubmit = (email) => {
            try {
                sendPasswordResetEmail(auth,email)
                .then(()=> {
                    alert("Password reset email sent to "+ email)
                }).then(()=> navigation.navigate("SignIn"))
            }catch(error){
                alert(error)
            }
            
        }    

    return (
        <ImageBackground source={require('../../../assets/images/Landing.png')}  style={styles.background}>
            <ScrollView style={styles.container}>
                <StatusBar style="auto" />
                <Formik >
                <View style = {styles.greeting}>
                    <Text style = {{fontSize:30, color: colors.text_white, fontWeight:'bold', }}>Reset Your Password</Text>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Email'
                            autoCapitalize='none'
                            placeholderTextColor = {colors.text_white}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                        <Button 
                            title = "Cancel"
                            buttonStyle = {styles.buttonCancel}
                            titleStyle = {styles.buttonTitle}
                            background={require('../../../assets/images/Login_B.png')}
                            onPress = {() => {navigation.navigate("Landing")}}
                        />
                        <Button 
                            title = "Reset"
                            buttonStyle = {styles.buttonSignIn}
                            titleStyle = {parameters.buttonTitle}
                            onPress={() => handleSubmit(email)}                            
                        />
                    </View>
                </View>  
                </Formik>
            
            </ScrollView>
       </ImageBackground>
       

    )}



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
        fontWeight: 'bold',
        width: 100
      },
      buttonSignIn: {
        backgroundColor: colors.button_violet,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        fontWeight: 'bold',
        width: 100
      },
      buttonTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3,
        

      }
    
 
})