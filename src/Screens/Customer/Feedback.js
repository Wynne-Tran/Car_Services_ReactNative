import React, {useState, useEffect} from 'react'
import { StyleSheet, View, StatusBar, ImageBackground, ScrollView, TextInput, Image, Text} from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {Formik} from 'formik'
import {auth, db} from '../../../firebase'
import { Avatar,Icon, Button} from 'react-native-elements';
import { collection, getDocs, updateDoc, doc} from  '@firebase/firestore'



const Feedback = ({navigation, route}) => {

    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const serviceCollectionRef = collection(db, "bank_account")
    const [count, setCount] = useState([route.params.info])
    const [bankAccount, setBankAccount] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUsers = async() => {
                const data = await getDocs(userCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers( data2.find(user => user.email === route.params.info.mec_email))
              }
            getUsers()

            const countService = async() => {
                const data = await getDocs(serviceCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                //setCount(data2.filter(e => e.email === auth.currentUser.email).length)
                setBankAccount(data2.filter(e => e.email === auth.currentUser.email));
            }
            countService()
        })
        return unsubscribe;
        
    }, [navigation])

    console.log(count)

    const sendFeedback = async(rate, feedback) => {
        let bankDoc = doc(db, "bank_account", count[0].id)
        let updateBankAccount = {
            email: count[0].email, 
            fullname: count[0].fullname,
            address: count[0].address,
            vehicle: count[0].vehicle,
            card_name: count[0].card_name, 
            card_number: count[0].card_number,
            card_type: count[0].card_type,
            expire_card: count[0].expire_card,
            cvv_card: count[0].cvv_card,
            checkout: count[0].checkout,
            service: count[0].service,
            payment: count[0].payment,
            appointmentAt: count[0].appointmentAt,
            status: count[0].status,
            createAt: count[0].createAt,
            mec_name : users.fullname,
            mec_approval: count[0].mec_approval,
            mec_phone: count[0].mec_phone,
            mec_email: count[0].mec_email,
            mec_message: "",
            mec_salary: count[0].mec_salary,
            mod_approval: count[0].mod_approval,
            day_approval: count[0].day_approval,
            total_time_works: count[0].total_time_works,
            mec_payment:  count[0].mec_payment,
            cus_feedback: feedback,
            cus_rate: rate,
        }
        await updateDoc(bankDoc, updateBankAccount)
        navigation.navigate("Confirm_Feedback");
    }

    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Feedback"/>
                <View style={styles.message}>
                    <View style={{justifyContent: 'center'}}>
                        <View style = {{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                            
                            <View>
                            {
                                users.image != undefined ?
                                (
                                    <Avatar 
                                        rounded
                                        avatarStyle = {styles.avatar}
                                        size = {65}
                                        source = {{uri: users.image}}
                                    />
                                ) : null
                            }
                            
                            </View>
                            <View >
                                <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.text_white, fontSize:30}}>{users.username}</Text>
                                <Text style = {{color: colors.text_white, fontSize:14}}>{users.email}</Text>
                                
                            </View>

                            <View>
                                <Image source={require('../../../assets/images/Rate.png')}  ></Image>
                            </View>
                            
                        </View>
                        
                    </View>
                </View>

                <ScrollView>
                <StatusBar style="auto" />
                <Formik 
                    initialValues = {{rate:'', feedback: ''}}
                    onSubmit = {(values) => {
                        sendFeedback(values.rate, values.feedback);
                    }}
                    >
                    { (props)=>(
                        <View>
                <View style = {styles.greeting}>
            
                    <View >
                    

                    <View>
                        <TextInput 
                            style = {styles.TextInput1}
                            placeholder='Rate 1 - 5 start'
                            placeholderTextColor = {colors.text_black}
                            autoFocus = {true}
                            onChangeText = {props.handleChange('rate')}
                            value = {props.values.rate}
                            keyboardType='number-pad'
                        />
                    </View>

                    <View>
                        <TextInput 
                            style = {styles.TextInput11}
                            placeholder='Feedback'
                            placeholderTextColor = {colors.text_black}
                            autoFocus = {true}
                            multiline={true}
                            numberOfLines={10}
                            textAlignVertical ='top'
                            height = '60%'
                            onChangeText = {props.handleChange('feedback')}
                            value = {props.values.feedback}
                        />
                    </View>
                </View>   
            </View>
                <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                    
                    <Button 
                        title = "Send"
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

export default Feedback

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
        marginTop: 30,
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
        height: 250,
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
      
      TextInput11:{
        borderWidth:2,
        borderColor:colors.text_white,
        color: colors.text_black,
        marginHorizontal:20,
        borderRadius:12,
        paddingLeft:15,
        marginTop: 20
        
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
      background2:{
        flex: 1, 
        width: "100%", 
        height: "auto",
        justifyContent: 'center', 
        backgroundColor: 'transparent', 
        resizeMode: 'cover',
        borderRadius: 12
    },
      
})
