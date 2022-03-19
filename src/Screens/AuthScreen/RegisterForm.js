import React, {useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {colors, parameters} from "../../GlobalStyle/styles"
import { Icon, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
import {auth, db} from '../../../firebase'
import {Formik} from 'formik'
import { collection, addDoc } from  '@firebase/firestore'


const initialValues = {
    fullname: '', 
    username: "", 
    email: "", 
    phone: "",
    address: "",
    jobTitle: "",
    vehicle: "",
    image: "",
    experience: "",
    salary: "",
    password: "", 
    confirmPass: "", 
    role: "", 
    activeMechanic: ""
}

export default function RegisterForm (Props) {

    const setRole = Props.route.params.title
    const[textInput2Fossued, setTextInput2Fossued] = useState(false)
    const [passwordFocussed, setPassorFocussed] = useState(false)
    const [passwordBlurded, setPasswordBlurded] = useState(false)
    const userCollectionRef = collection(db, "users")
    const url = "https://firebasestorage.googleapis.com/v0/b/reactnative-79949.appspot.com/o/None.jpeg?alt=media&token=5389422a-d79c-4bb2-aaf6-8a43cb2a5972"
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('visibility-off');

    const createUser = async (phone, username, email, password) => {
        await addDoc(userCollectionRef, 
            {fullname: "", 
                username: username, 
                email: email.toLowerCase(), 
                password: password, 
                role: setRole,
                phone: phone,
                address: "",
                jobTitle: "",
                vehicle: "",
                image: url,
                experience: "",
                salary: "",
                activeMechanic: ""
            })
        
      }
    
    async function handleSignUp(values) {
        const {phone, username, email, password} = values
        try {
          await 
          auth
          .createUserWithEmailAndPassword(email.toLowerCase(), password)
          .then(userCredentials => {
              const user = userCredentials.user;
              createUser(phone, username, email, password)
              .then(
                  console.log(user.email + " account was created"),
                  Props.navigation.navigate("SignIn")
              )
              .catch( e => console.log(e))
              
          })
        }
        catch (error) {
          Alert.alert(error.message)
        }
    }

    function confirmPass(values){
        const {password, confirmPass} = values
        if(password === confirmPass){
            handleSignUp(values)
        }
        else{
            Alert.alert("Confirm Password did not match !")
        }
    }


    const handlePasswordVisibility = () => {
        if (rightIcon === 'visibility-off') {
          setRightIcon('visibility');
          setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'visibility') {
          setRightIcon('visibility-off');
          setPasswordVisibility(!passwordVisibility);
        }
      
    
        return {
            passwordVisibility,
            rightIcon,
            handlePasswordVisibility
        };
    };

    return (
        <ImageBackground source={require('../../../assets/images/Landing.png')}  style={styles.background}>
            <ScrollView style={styles.container}>
                <StatusBar style="auto" />
                <Formik initialValues = {initialValues} 
                    onSubmit = {(values) => {
                        if(values.phone.length == 10){
                            confirmPass(values)
                        }
                        else{
                            Alert.alert("Phone incorrect !")
                        }
                    
                }}>
                {
                    (props) => (
                    <View style = {styles.greeting}>
                        <Text style = {{fontSize:36, color: colors.text_white, fontWeight:'bold', marginLeft: "25%", }}>Register</Text>
                        <View style = {{marginTop: 10}}>
                        
                        <View>
                            <TextInput 
                                style = {styles.TextInput1}
                                placeholder='Phone'
                                placeholderTextColor = {colors.text_white}
                                autoFocus = {true}
                                onChangeText = {props.handleChange('phone')}
                                value = {props.values.phone}
                                keyboardType='number-pad'
                            />
                        </View>

                        <View>
                            <TextInput 
                                style = {styles.TextInput1}
                                placeholder='User Name'
                                placeholderTextColor = {colors.text_white}
                                autoFocus = {true}
                                onChangeText = {props.handleChange('username')}
                                value = {props.values.username}
                            />
                        </View>
                        
                        <View>
                            <TextInput 
                                style = {styles.TextInput1}
                                placeholder='Email'
                                placeholderTextColor = {colors.text_white}
                                autoFocus = {true}
                                onChangeText = {props.handleChange('email')}
                                value = {props.values.email}
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
                                        style = {{width: "80%", color: colors.text_white}}
                                        style = {{flex: 1, color: colors.text_white}}
                                        placeholder = "Password"
                                        placeholderTextColor = {colors.text_white}
                                        autoFocus = {false}
                                        onChangeText = {props.handleChange('password')}
                                        value = {props.values.password}
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
                                <Icon 
                                    name="lock"
                                    iconStyle = {{color:colors.grey3}}
                                    type = "material"
                                    styles = {{marginRight: 10}}
                                />
                            </Animatable.View>
                            <TextInput 
                                    style = {{width: "80%", color: colors.text_white}}
                                    style = {{flex: 1, color: colors.text_white}}
                                    placeholder = "Confirm Password"
                                    placeholderTextColor = {colors.text_white}
                                    autoFocus = {false}
                                    onChangeText = {props.handleChange('confirmPass')}
                                    value = {props.values.confirmPass}
                                    onFocus={() => {setPassorFocussed(true)}}
                                    onBlur={() => {setPasswordBlurded(true)}}
                                    secureTextEntry = {passwordVisibility}
                                />
                            <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                <TouchableOpacity onPress={handlePasswordVisibility}>
                                    <Icon 
                                        name= {rightIcon}
                                        iconStyle = {{color:colors.grey3}}
                                        type = "material"
                                        style = {{marginRight: 10}}
                                        
                                    />
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>


                        <View style = {styles.buttonContainer}>
                            <Button 
                                title = "Cancel"
                                buttonStyle = {styles.buttonCancel}
                                titleStyle = {parameters.buttonTitle}
                                onPress = {() => {Props.navigation.goBack()}}
                            />
                            <Button 
                                title = "Register"
                                buttonStyle = {styles.buttonSignIn}
                                titleStyle = {parameters.buttonTitle}
                                onPress={props.handleSubmit}
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
        marginTop: 200,
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
        width: 100,
        
        fontWeight: 'bold'
      },
      buttonSignIn: {
        backgroundColor: colors.button_violet,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        width: 100,
        
        fontWeight: 'bold'
      },
    buttonContainer: {
        flexDirection: "row", 
        marginLeft: 20, 
        marginHorizontal: 20, 
        marginTop: 30, 
        justifyContent: 'space-evenly',
        marginBottom: 20,
    }
    
 
})