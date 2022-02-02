import React, {useState} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TextInput, Alert} from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import { Button} from 'react-native-elements';
import { Formik} from "formik";
import {auth, db} from '../../../firebase'
import { collection, addDoc } from  '@firebase/firestore'
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';



const radioProps = [
    { label: 'Visa', value: 'Visa' },
    { label: 'Debit', value: 'Debit' }
  ];


const Checkout = ({route, navigation}) => {

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
                <Formik 
                onSubmit = {() => {}}
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
                                    value = {props.values}

                                    />
                            </View>
                            
                            <View styles={{}}>
                            <TextInput 
                                    style = {styles.TextInput1}
                                    placeholder = "Card Number"
                                    placeholderTextColor = {'black'}
                                    autoFocus = {false}
                                    keyboardType='number-pad'
                                />
                                   
                            <TextInput 
                                    style = {styles.TextInput1}
                                    placeholder = "Card Holder"
                                    placeholderTextColor = {'black'}
                                    autoFocus = {false}
                                    
                                />

                            <TextInput 
                                    style = {styles.TextInput1}
                                    placeholder = "Expire Date"
                                    placeholderTextColor = {'black'}
                                    autoFocus = {false}

                                    
                                />

                            <View>
                                <TextInput 
                                        style = {styles.TextInput1}
                                        placeholder = "CVV"
                                        placeholderTextColor = {'black'}
                                        autoFocus = {false}

                                        
                                    />
                            </View>

                            </View>  
                            

                            <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 20, justifyContent: 'space-evenly'}}>
                                        
                                <Button 
                                    title = "Check Out"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={() => navigation.navigate('Confirm_Message')}
                                    
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


