import React, {useState, useEffect} from 'react'
import { StyleSheet, View, StatusBar, ImageBackground, ScrollView, TextInput, TouchableOpacity , Alert} from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {Formik} from 'formik'
import {auth, db, storage} from '../../../firebase'
import { Icon, Button} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import { collection, getDocs, updateDoc, doc} from  '@firebase/firestore'



const Edit_Profile = ({navigation}) => {

    const[filename,setFileName]=useState("Choose Image")
    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUsers = async() => {
                const data = await getDocs(userCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers( data2.find(user => user.email === auth.currentUser.email))
              }
            getUsers()
        })
        return unsubscribe;
        
    }, [navigation])
   

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowEditing: true,
            aspect: [4, 3],
            quaility: 1,
        })

        if(!result.cancelled){
            const response = await fetch(result.uri)
            var blob = await response.blob()
            var ref = storage.ref().child(auth.currentUser.email)
            
            try{
                ref.put(blob)
                .then(setFileName("Please wait...."))
                .then (async () => {
                const url = await ref.getDownloadURL();
                users.image = url
                setFileName("Image Uploaded ✅")

              })
            }
            catch(e){
                console.log(e)
            }
            
        }
    }
    const updateUser = async(id, fullname, address, getImageUrl) => {
        let userDoc = doc(db, "users", id)
        const newFields = {
            fullname: fullname, 
            username: users.username, 
            email: users.email, 
            password: users.password, 
            role: users.role,
            phone: users.phone,
            address: address,
            jobTitle: users.jobTitle,
            vehicle: "",
            image: getImageUrl,
            experience: users.experience,
            salary: "",
            password: users.password, 
            activeMechanic: ""
        }
        await updateDoc(userDoc, newFields)
    }



    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Edit Profile"/>

                <ScrollView style={styles.container}>
                <StatusBar style="auto" />
                <Formik 
                    initialValues = {{fullname: '',address: ''}}
                    onSubmit = {(value)=>{
                        updateUser(users.id, value.fullname, value.address, users.image)
                        navigation.goBack() }}
                    >
                    { (props)=>(
                        <View>
                <View style = {styles.greeting}>
            
                    <View style = {{marginTop: 10}}>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Full Name'
                            placeholderTextColor = {colors.text_black}
                            onChangeText = {props.handleChange('fullname')}
                            value = {props.values.fullname}
                        />
                    </View>
                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Address'
                            placeholderTextColor = {colors.text_black}
                            autoFocus = {true}
                            onChangeText = {props.handleChange('address')}
                            value = {props.values.address}
                        />
                    </View>

                        <TouchableOpacity onPress = {pickImage}>
                            <View style = {styles.TextInput2} >
                                <TextInput 
                                        style = {{width: "80%", color: colors.text_black}}
                                        placeholder= {filename}
                                        placeholderTextColor = {colors.text_black}
                                    />
                                <Icon 
                                        name = "upload"
                                        iconStyle = {{color:colors.Card_Black}}
                                        type = "material-community"
                                        style = {{marginRight: 10}}
                                    />
                            </View>
                        </TouchableOpacity>
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

export default Edit_Profile

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

