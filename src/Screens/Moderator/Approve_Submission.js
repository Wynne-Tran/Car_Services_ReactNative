import React, {useState, useEffect, useMemo} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {auth, db} from '../../../firebase'
import {Button} from 'react-native-elements'
import moment from 'moment'
import { collection, getDocs, updateDoc, doc} from  '@firebase/firestore'


const Approve_Submission = ({navigation, route}) => {


    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const serviceCollectionRef = collection(db, "bank_account")
    const [count, setCount] = useState([])

    useEffect(() => {
        const getUsers = async() => {
            const data = await getDocs(userCollectionRef)
            const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setUsers( data2.find(user => user.email === auth.currentUser.email))
          }
        getUsers()

        const countService = async() => {
            const data = await getDocs(serviceCollectionRef)
            const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setCount(data2.filter(e => e.id === route.params.id))
        }
        countService()
        
    }, [navigation])


    const applyTask = async() => {
        let bankDoc = doc(db, "bank_account", count[0].id)
        let payment = parseFloat(count[0].checkout) - parseFloat(count[0].mec_payment);
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
            payment: payment,
            appointmentAt: count[0].appointmentAt,
            status: count[0].status,
            createAt: count[0].createAt,
            mec_name : count[0].mec_name,
            mec_approval: count[0].mec_approval,
            mec_phone: count[0].mec_phone,
            mec_email: count[0].mec_email,
            mec_message: count[0].mec_message,
            mec_salary: count[0].mec_salary,
            mod_email: auth.currentUser.email,
            mod_approval: "Yes",
            day_approval: new Date(),
            total_time_works: count[0].total_time_works,
            mec_payment:  count[0].mec_payment,
            cus_feedback: count[0].cus_feedback,
            cus_rate: count[0].cus_rate,
        }
        await updateDoc(bankDoc, updateBankAccount);
    }
    
    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />
                <HomeHeader navigation={navigation} role = "Approve Submission"/>
                { count[0] != undefined &&
                    (
                        <View style={styles.message}>
                            <Text style={{color: colors.text_white, fontSize: 25, fontWeight: 'bold', paddingVertical: 10, paddingVertical: 30, paddingHorizontal: 100}}>Review Task</Text>
                                <View style = {{alignItems: 'center'}}>
                                    <View style={{width: 200, justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 50, backgroundColor: "#C8372D"}}>
                                        <Text style={{color: colors.text_white, fontSize: 18, alignItems: 'center', fontWeight: 'bold'}}>{count[0].service.length} Services</Text>
                                    </View>
                                </View>
                            <View style = {{paddingVertical: 30}}>
                                <Text style={{color: "#C8372D", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>TASK DETAIL</Text>
                                <View style={{marginLeft: 15, marginRight: 10}}>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].fullname}</Text>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{moment(count[0].appointmentAt).format("DD/MM/YYYY hh:mm")}</Text>
                                        
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].address}</Text>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>Cus Payment: ${count[0].checkout}</Text>
                                    </View>
                                </View>
                            </View>
            
                            <View style={{marginTop: 30}}>
                                <Text style={{color: "#C8372D", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>VEHICLE</Text>
                                <View style = {{marginVertical: 10}}>
                                    <View style = {{alignItems: 'center'}}>
                                        <View style={{width: '60%', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 50, backgroundColor: "#2264D1"}}>
                                            <Text style={{color: colors.text_white, fontSize: 18, alignItems: 'center', fontWeight: 'bold'}}> 🚗 {count[0].vehicle} </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {count[0].mec_approval != "" && (
                                <View style = {{paddingVertical: 15}}>
                                <Text style={{color: "#C8372D", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>MECHANIC DETAIL</Text>
                                <View style={{marginLeft: 15, marginRight: 10}}>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].mec_name}</Text>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].mec_phone}</Text>
                                    </View>

                                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>Status: {count[0].status}</Text>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>Mec Payment: ${count[0].mec_payment}</Text>
                                    </View>
                                    
                                </View>
                                </View>
                            )}

                            <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 50, justifyContent: 'space-evenly'}}>
                            {count[0].mod_approval != "" ? (
                                    
                                    <Button 
                                    title = "Back"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={() => navigation.goBack()}
                                    
                                    
                                    />
                                ) : (
                                    
                                    <Button 
                                    title = "Approve"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={() => {applyTask(); navigation.navigate('Confirm_Message')}}
                                    
                                />
                                )}
                        </View> 
    
                        </View>
                    )
                    }
                
            </View>
        </ImageBackground>
    )
}

export default Approve_Submission

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
        backgroundColor: colors.Card_Black,
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 500,
        marginTop: 20
    },
    buttonSignIn: {
        backgroundColor: colors.button_violet,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.button_violet,
        height: 50,
        width: 150,
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