import React, {useState, useEffect} from 'react'
import { StyleSheet, View, StatusBar, ImageBackground, ScrollView, TextInput, TouchableOpacity , Alert} from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {Formik} from 'formik'
import {auth, db} from '../../../firebase'
import { Icon, Button} from 'react-native-elements';
import { collection, getDocs, updateDoc, doc} from  '@firebase/firestore'



const Change_Password = ({navigation}) => {

    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('visibility-off');

    useEffect(() => {
        const getUsers = async() => {
            const data = await getDocs(userCollectionRef)
            const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setUsers( data2.find(user => user.email === auth.currentUser.email))
          }
        getUsers()
        
    }, [])

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
   

    const updatePass = async(id, newPass) => {
        let userDoc = doc(db, "users", id)
        const newFields = {
            fullname: users.fullname, 
            username: users.username, 
            email: users.email, 
            password: users.password, 
            role: users.role,
            phone: users.phone,
            address: users.address,
            jobTitle: users.jobTitle,
            vehicle: users.vehicle,
            image: users.image,
            experience: users.experience,
            salary: users.salary,
            password: newPass, 
            activeMechanic: users.activeMechanic
        }
        
        await updateDoc(userDoc, newFields)
        auth.currentUser.updatePassword(newPass)
    }



    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Change Password"/>

                <ScrollView style={styles.container}>
                <StatusBar style="auto" />
                <Formik 
                    initialValues = {{currentPass: '',newPass: '', confirmPass: ''}}
                    onSubmit = {(value)=>{
                        if(users.password == value.currentPass.toLocaleLowerCase()){
                            if(value.newPass == value.confirmPass){
                                updatePass(users.id, value.newPass)
                                Alert.alert("Password was changed !")
                                navigation.goBack()
                            }
                            else{
                                Alert.alert("Confirm password doesnt match !")
                            }

                        }
                        else{
                            Alert.alert("Current Password Incorrect")
                        }
                        }}
                    >
                    { (props)=>(
                        <View>
                <View style = {styles.greeting}>
            
                    <View style = {{marginTop: 10}}>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Current Password'
                            placeholderTextColor = {colors.text_black}
                            onChangeText = {props.handleChange('currentPass')}
                            value = {props.values.currentPass}
                            
                        />
                    </View>
                    <View style = {styles.TextInput2}>
                        <TextInput 
                            
                            placeholder='New Password'
                            placeholderTextColor = {colors.text_black}
                            autoFocus = {true}
                            onChangeText = {props.handleChange('newPass')}
                            value = {props.values.newPass}
                            secureTextEntry={passwordVisibility}
                        />
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                            <Icon 
                                name= {rightIcon}
                                iconStyle = {{color:colors.grey3}}
                                type = "material"
                                style = {{marginRight: 10}}
                                
                            />
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.TextInput2}>
                        <TextInput 
                            placeholder='Confirm Password'
                            placeholderTextColor = {colors.text_black}
                            autoFocus = {true}
                            onChangeText = {props.handleChange('confirmPass')}
                            value = {props.values.confirmPass}
                            secureTextEntry={passwordVisibility}
                        />
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                            <Icon 
                                name= {rightIcon}
                                iconStyle = {{color:colors.grey3}}
                                type = "material"
                                style = {{marginRight: 10}}
                                
                            />
                        </TouchableOpacity>
                    </View>
                </View>   
            </View>
                <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                    
                    <Button 
                        title = "Save"
                        buttonStyle = {styles.buttonSignIn}
                        titleStyle = {parameters.buttonTitle}
                        onPress={props.handleSubmit}
                        
                    />
                </View> 
                </View>
                
                )}
                </Formik>
            
            </ScrollView>
                
            </View>
        </ImageBackground>
    )
}

export default Change_Password

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
    greeting: {
        flex: 3, 
        marginTop: 50,
        borderColor: 'white',
        borderRadius: 15,
        width: '90%',
        backgroundColor: "#b8b5ff",
        opacity: 0.6,
        marginLeft: "5%",
        marginBottom: 20,
        paddingVertical: 30
       
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
        color: colors.text_black,
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15,
        height: 45
      },

      TextInput2:{
        borderWidth:2,
        borderRadius:12,
        borderColor: colors.text_white,
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        paddingLeft:15,
        height: 45,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10
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

