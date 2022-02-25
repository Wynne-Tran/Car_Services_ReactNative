import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TextInput, Alert} from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import { Button} from 'react-native-elements';
import { Formik} from "formik";
import {auth, db} from '../../../firebase'
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';
import { collection, getDocs, addDoc } from  '@firebase/firestore'



const radioProps = [
    { label: 'Visa', value: 'Visa' },
    { label: 'Debit', value: 'Debit' }
  ];


const Checkout = ({route, navigation}) => {

    const userCollectionRef = collection(db, "bank_account")
    const [card_type, setCard_Type] = useState("")

    const accountCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUsers = async() => {
                const data = await getDocs(accountCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers( data2.find(user => user.email === auth.currentUser.email))
              }
            getUsers()
        })
        return unsubscribe;
        
    }, [navigation])

    
    const passdate = route.params.date;
    var total_hours = 0;
    (route.params.services).filter(element => element.isChecked == true ? 
        (total_hours+= parseFloat(element.time)) : null)
    const services = (route.params.services).filter(element => element.isChecked == true)

    const initialValues = {
    
        email: auth.currentUser.email, 
        fullname: users.fullname,
        address: users.address,
        vehicle: users.vehicle,
        card_name: "", 
        card_number: "",
        card_type: "",
        expire_card: "",
        cvv_card: "",
        checkout: route.params.checkout,
        service: {},
        payment: 0.0,
        appointmentAt: route.params.date,
        status: "",
        createAt: new Date(),
        mec_approval: "",
        mec_phone: "",
        mec_salary:0,
        mod_approval: "",
        day_approval: "",
        total_time_works: total_hours,
        mec_payment: 0

        
    }
    

    const createAccount = async (card_number, card_name, expire_card, cvv_card) => {
        await addDoc(userCollectionRef, 
            {
                email: auth.currentUser.email, 
                fullname: users.fullname,
                address: users.address,
                vehicle: users.vehicle,
                card_name: card_name, 
                card_number: card_number,
                card_type: card_type,
                expire_card: expire_card,
                cvv_card: cvv_card,
                checkout: route.params.checkout,
                service: services,
                payment: 0.0,
                appointmentAt: route.params.date,
                status: "",
                createAt: new Date().toUTCString(),
                mec_approval: "",
                mec_phone: "",
                mec_salary:0,
                mod_approval: "",
                day_approval: "",
                total_time_works: total_hours,
                mec_payment: 0
            })
        
      }


      async function submit(values) {
        const {card_number, card_name, expire_card, cvv_card} = values
        try {
          await 
          createAccount(card_name, card_number, expire_card, cvv_card)
            .then(
                //console.log(user.email + " check"),
                navigation.navigate("Confirm_Message", {date: passdate})
            )
            .catch( e => console.log(e))
            
        }
        catch (error) {
          console.log(error)
        }
    }

    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Checkout"/>

                <View style ={styles.message}>
                <Formik initialValues = {initialValues}
                onSubmit = {(values) => {

                    if(values.card_number.length == 20){
                        console.log(values)
                        submit(values)
                    }
                    else{
                        Alert.alert("Card number incorrect !")
                    }
                
                }}
                >
                {
                    (props) => (
                        <View>
                            <Text style={{color:'black', fontSize: 25, fontWeight: 'bold', paddingVertical: 10, paddingVertical: 10, paddingHorizontal: 100}}>Card Detail</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Image source={require("../../../assets/images/visa.png")} style={{width: 60, resizeMode: 'contain'}}/>
                                <Image source={require("../../../assets/images/debit.png")} style={{width: 60, resizeMode: 'contain'}}/>
                            </View >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <RadioForm
                                    style ={{flexDirection: 'row'}}
                                    buttonColor= "black"
                                    buttonSize={12}
                                    radioStyle={{marginLeft: 15, paddingHorizontal: 35, marginBottom: 20}}
                                    selectedButtonColor="#000000"
                                    radio_props={radioProps}
                                    initial={0}
                                    animation={false}
                                    onPress={(value) => setCard_Type(value)}
                                    value = {props.values.card_type}

                                    />
                            </View>
                            
                            <View styles={{}}>
                            <TextInput 
                                    style = {styles.TextInput1}
                                    placeholder = "Card Number"
                                    placeholderTextColor = {'black'}
                                    autoFocus = {false}
                                    onChangeText = {props.handleChange('card_number')}
                                    value = {props.values.card_number}
                                    keyboardType='number-pad'
                                />
                                   
                            <TextInput 
                                    style = {styles.TextInput1}
                                    placeholder = "Card Holder"
                                    placeholderTextColor = {'black'}
                                    autoFocus = {false}
                                    onChangeText = {props.handleChange('card_name')}
                                    value = {props.values.card_name}
                                    
                                />

                            <TextInput 
                                    style = {styles.TextInput1}
                                    placeholder = "Expire Date"
                                    placeholderTextColor = {'black'}
                                    autoFocus = {false}
                                    onChangeText = {props.handleChange('expire_card')}
                                    value = {props.values.expire_card}
                                    
                                />

                            <View>
                                <TextInput 
                                        style = {styles.TextInput1}
                                        placeholder = "CVV"
                                        placeholderTextColor = {'black'}
                                        autoFocus = {false}
                                        onChangeText = {props.handleChange('cvv_card')}
                                        value = {props.values.cvv_card}
                                        
                                    />
                            </View>

                            </View>  
                            


                            <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 20, justifyContent: 'space-evenly'}}>
                                        
                                <Button 
                                    title = "Check Out"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={props.handleSubmit}
                                    
                                />
                            </View> 
                        </View>
                    )}

                </Formik>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Checkout

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
        height: 400,
        marginTop: 50
    },
    buttonSignIn: {
        backgroundColor: "#7868E6",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        width: 200,
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
      message:{
        backgroundColor: "#E5E5E5",
        width: '90%',
        borderRadius: 20,
        marginLeft: "5%",
        height: 550,
        marginTop: 50
    },
    TextInput1:{
        borderWidth:2,
        borderColor:colors.text_white,
        color: 'black',
        marginHorizontal:20,
        borderRadius:12,
        marginBottom:20,
        paddingLeft:15,
        height: 45
      },
      
})
