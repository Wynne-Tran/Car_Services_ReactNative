import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {colors, parameters} from "../../GlobalStyle/styles"
import { Icon, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
import {Formik} from 'formik'



export default function ForgotPassword ({navigation}) {

    

    return (
        <ImageBackground source={require('../../../assets/images/Landing.png')}  style={styles.background}>
            <ScrollView style={styles.container}>
                <StatusBar style="auto" />
                <Formik 
                initialValues = {{email: '', phone: '', newPass: '', confirmPass: ''}}
                onSubmit = {(value)=>{

                    const findEmail = users.filter(user => user.email === value.email.toLowerCase())
                    if(findEmail !== null && findEmail[0].phone === value.phone){
                        if(value.newPass == value.confirmPass){
                            updatePass(findEmail[0].id, value.newPass)
                            Alert.alert("Password was changed !")
                            navigation.goBack()
                        }
                        else{
                            Alert.alert("Confirm password doesnt match !")
                        }
                    }
                    else{
                        Alert.alert("Email or Role incorrect !")
                    }
                    }}

                    
                
                    >
                    { (props)=>(
                <View style = {styles.greeting}>
                    <Text style = {{fontSize:36, color: colors.text_white, fontWeight:'bold', marginLeft: "20%", }}>New Password</Text>
                    <View style = {{marginVertical: 30}}>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Email'
                            placeholderTextColor = {colors.text_white}
                            onChangeText = {props.handleChange('email')}
                            value ={props.values.email}
                        />
                    </View>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Phone'
                            placeholderTextColor = {colors.text_white}
                            onChangeText = {props.handleChange('phone')}
                            value ={props.values.phone}
                        />
                    </View>

                    <View style = {{marginBottom:20}}>
                            <View style = {styles.TextInput2}>

                                <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                    <Icon 
                                        name="lock"
                                        iconStyle = {{color:colors.grey3}}
                                        type = "material"
                                        styles = {{marginRight: 10}}
                                    />
                                </Animatable.View>

                                <TextInput 
                                        //style = {{width: "80%", color: colors.text_white}}
                                        style = {{flex: 1, color: colors.text_white}}
                                        placeholder = "New Password"
                                        placeholderTextColor = {colors.text_white}
                                        autoFocus = {false}
                                        onChangeText = {props.handleChange('newPass')}
                                        value = {props.values.newPass}
                                        onFocus={() => {setPassorFocussed(true)}}
                                        onBlur={() => {setPasswordBlurded(true)}}
                                        secureTextEntry={passwordVisibility}
                                    />

                                <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                    <Icon 
                                        name= {rightIcon}
                                        iconStyle = {{color:colors.grey3}}
                                        type = "material"
                                        style = {{marginRight: 10}}
                                        onPress={handlePasswordVisibility}
                                    />
                                </Animatable.View>
                            </View>
                        </View>

                        <View style = {styles.TextInput2}>
                            <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                <TouchableOpacity onPress={handlePasswordVisibility}>
                                    <Icon 
                                        name="lock"
                                        iconStyle = {{color:colors.grey3}}
                                        type = "material"
                                        styles = {{marginRight: 10}}
                                    />
                                </TouchableOpacity>
                            </Animatable.View>
                            <TextInput 
                                    //style = {{width: "80%", color: colors.text_white}}
                                    style = {{flex: 1, color: colors.text_white}}
                                    placeholder = "Confirm Password"
                                    placeholderTextColor = {colors.text_white}
                                    autoFocus = {false}
                                    onChangeText = {props.handleChange('confirmPass')}
                                    value = {props.values.confirmPass}
                                    onFocus={() => {setPassorFocussed(true)}}
                                    onBlur={() => {setPasswordBlurded(true)}}
                                    secureTextEntry ={passwordVisibility}
                                />
                            <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                <TouchableOpacity onPress={handlePasswordVisibility}>
                                    <Icon 
                                        name={rightIcon}
                                        iconStyle = {{color:colors.grey3}}
                                        type = "material"
                                        style = {{marginRight: 10}}
                                    />
                                </TouchableOpacity>
                            </Animatable.View>
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
                            title = "Save"
                            buttonStyle = {styles.buttonSignIn}
                            titleStyle = {parameters.buttonTitle}
                            onPress={() => {navigation.navigate("SignIn")}}
                            
                        />
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