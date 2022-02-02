import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Alert  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import { CheckBox, Icon, Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);


const Booking = ({navigation}) => {

    const data = [{id: 1,  label: 'Tire Care', value: '40', time: "1", isChecked: false },
        {id: 2,  label: 'Paint Design', value: '500', time: "1", isChecked: false },
        {id: 3,  label: 'Wash & Vac', value: '35', time: "1", isChecked: false },
        {id: 4,  label: 'Road Assistant', value: '300', time: "1", isChecked: false },
        {id: 5,  label: 'Oil Change', value: '30', time: "1", isChecked: false },
        {id: 6,  label: 'Tire Air', value: '0', time: "1", isChecked: false },
        {id: 7,  label: 'Replace Battery', value: '50', time: "1", isChecked: false },
        {id: 8,  label: 'Belt Replacement', value: '50', time: "1", isChecked: false },
        {id: 9,  label: 'Service Package', value: '90', time: "1", isChecked: false },
        {id: 10,  label: 'Interior Wash', value: '35', time: "1", isChecked: false },
        {id: 11,  label: 'Standard Wash', value: '55', time: "1", isChecked: false },
        {id: 12,  label: 'Quick Wax', value: '95', time: "1", isChecked: false },
        {id: 13,  label: 'VIP Wash', value: '175', time: "1", isChecked: false },
        {id: 14,  label: 'Outside Wash', value: '30', time: "1", isChecked: false }]


    var [date, setDate] = useState(new Date(1604324457992))
    const [radioProps, setRadioProps] = useState(data)

    


    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Booking"/>

                        <View>
                            <Text style={{fontWeight:'bold', marginLeft: 20}}>Date & Time</Text>
                            <DateTimePicker
                                    timeZoneOffsetInMinutes={-5}
                                    minimumDate={0}
                                    minTime = {"10:00"}
                                    maxTime = {"18:00"}
                                    style={{marginLeft: 120, }}
                                    mode = 'datetime'
                                    value={date}
                                    
                                />

                            <View style={styles.message}>
                                <Text style={{fontSize: 25, marginVertical: 10}}>Full Services Price</Text>
                                <ScrollView>
                                    {radioProps.map(e => (
                                    <View key = {e.id} style={{width: 320, height: 50, backgroundColor: colors.Card_Violet, borderRadius: 12, marginTop: 10, alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', width: 300, height: 60, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center'}}>
                                        
                                            <CheckBox
                                                //center
                                                checkedColor={colors.Card_Violet}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checked= {e.isChecked}
                                                onPress = {() => handleChange(e.id)}
                                                
                                            />
                                            
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 20}}>{e.label}</Text> 
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 10}}>${e.value}</Text>

                                        </View>
                                    </View>

                                    ))}

                                    </ScrollView>
                            

                            </View>

                            <View style={styles.message2}>
                                <View style={{width: 320, height: 50, backgroundColor: colors.Card_Violet, borderRadius: 12, marginTop: 10, alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', width: 300, height: 50, backgroundColor: colors.Card_LightViolet, justifyContent: 'space-between', alignItems: 'center'}}>
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 20}}>Total</Text> 
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 20}}>$payment</Text>

                                        </View>
                                    </View>

                                    <View style={{width: 320, height: 50, backgroundColor: colors.Card_Violet, borderRadius: 12, marginTop: 5, alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', width: 300, height: 50, backgroundColor: colors.Card_LightViolet, justifyContent: 'space-around', alignItems: 'center'}}>
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 20}}>Payment</Text> 
                                            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'red'}}>(+ Tax) $payment</Text> 
                                            <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 5}}>$payment</Text>

                                        </View>
                                    </View>

                            </View>

                            <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, justifyContent: 'space-evenly'}}>
                                
                                <Button 
                                    title = "Check Out"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={() => navigation.navigate("Checkout", )}
                                    
                                />
                            </View> 
                        </View>
            </View>
        </ImageBackground>
    )
}

export default Booking

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
    card: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
    },
    message:{
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderColor: '#7868E6',
        borderWidth: 2,
        width: '90%',
        borderRadius: 20,
        marginLeft: "5%",
        height: 300,
        marginTop: 50,
        alignItems: 'center'
    },
    message2:{
        backgroundColor: 'transparent',
        width: '90%',
        marginLeft: "5%",
        height: 200,
        alignItems: 'center',
        marginTop: 20
    },
    buttonSignIn: {
        backgroundColor: colors.Card_Violet,
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
      
})



                    
/*

<RadioForm
                                                
*/