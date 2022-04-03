import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {colors, parameters} from "../../GlobalStyle/styles"
import { Icon, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
import {Formik} from 'formik'
// here connect Firebase
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'

export default function SignIn ({navigation}) {

    const[textInput2Fossued, setTextInput2Fossued] = useState(false)
    const textInput1 = useRef(1)
    const textInput2 = useRef(2)
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('visibility-off');

    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async() => {
            const data = await getDocs(userCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
          }
        getUsers()
        
    }, [])
    
    function signIn(data){
        const {email, password} = data
        auth
        .signInWithEmailAndPassword(email.toLowerCase(), password)
        .then(userCredentials => {
            const user = userCredentials.user;
            if(user){
                const getUserRole = users.filter(data => data.email === email.toLowerCase())
                if(getUserRole[0].role === "Moderator"){navigation.navigate("DrawerNavigator_Moderator")}
                else if(getUserRole[0].role === "Mechanic"){navigation.navigate("DrawerNavigator_Mechanic")}
                else{navigation.navigate("DrawerNavigator_Customer")}
            }
            else{
                Alert.alert("Email or password incorrect !")
            }
        }).catch(e =>
            e ? Alert.alert("Email or password incorrect !") : null
        )}

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
                <Formik 
                initialValues = {{email:'',password:''}}
                onSubmit = {(values)=>{
                           signIn(values)
                        }}
                    >
                    { (props)=>(
                <View style = {styles.greeting}>
                    <Text style = {{fontSize:36, color: colors.text_white, fontWeight:'bold',textAlign:'center' }}>Sign In</Text>
                    <View style = {{marginTop: 10}}>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Email'
                            placeholderTextColor = {colors.text_white}
                            ref = {textInput1}
                            onChangeText = {props.handleChange('email')}
                            value ={props.values.email}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style = {styles.TextInput2}>
                        <TextInput 
                                style = {{width: "80%", color: colors.text_white}}
                                placeholder='Password'
                                placeholderTextColor = {colors.text_white}
                                ref = {textInput2}
                                onFocus={() => {
                                    setTextInput2Fossued(false)
                                }}
                                onBlur={() => {
                                    setTextInput2Fossued(true)
                                }}
                                secureTextEntry={passwordVisibility}
                                onChangeText = {props.handleChange('password')}
                                value = {props.values.password}
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


                    <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                        <Button 
                            title = "Cancel"
                            buttonStyle = {styles.buttonCancel}
                            titleStyle = {styles.buttonTitle}
                            background={require('../../../assets/images/Login_B.png')}
                            onPress = {() => {navigation.navigate("Landing")}}
                        />
                        <Button 
                            title = "Sign in"
                            buttonStyle = {styles.buttonSignIn}
                            titleStyle = {parameters.buttonTitle}
                            onPress={props.handleSubmit}
                            
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ForgotPassword")
                        }}
                    >
                        <View style = {{alignItems: "center", marginTop: 20,marginBottom:20}}>
                            <Text style = {{...styles.text1, textDecorationLine: "underline"}}>Forgot Password ?</Text>
                        </View>
                    </TouchableOpacity>
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
        width: 120
      },
      buttonSignIn: {
        backgroundColor: colors.button_violet,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        fontWeight: 'bold',
        width: 120
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