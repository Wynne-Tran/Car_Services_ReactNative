import React, {useState, useEffect, useMemo} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {auth, db} from '../../../firebase'
import {Button} from 'react-native-elements'
import moment from 'moment'
import { collection, getDocs, updateDoc, doc} from  '@firebase/firestore'


const Apply_Tasks = ({navigation, route}) => {


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
        const payment = parseFloat(count[0].total_time_works) * parseFloat(users.salary);
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
            mec_approval: "Yes",
            mec_phone: users.phone,
            mec_email: users.email,
            mec_message: count[0].payment,
            mec_salary:users.salary,
            mod_email: "",
            mod_approval: "",
            day_approval: new Date(),
            total_time_works: count[0].total_time_works,
            mec_payment:  payment.toString(),
            cus_feedback: "",
            cus_rate: "",
        }
        await updateDoc(bankDoc, updateBankAccount)
        
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
                                    <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].address}</Text>
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
                                <View style = {{paddingVertical: 30}}>
                                <Text style={{color: "#C8372D", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>MECHANIC DETAIL</Text>
                                <View style={{marginLeft: 15, marginRight: 10}}>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].mec_name}</Text>
                                        <Text style = {{color: colors.text_white, fontSize: 15}}>{count[0].mec_phone}</Text>
                                    </View>
                                    <Text style = {{color: colors.text_white, fontSize: 15}}>Status: {count[0].status}</Text>
                                </View>
                                </View>
                            )}

                            <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                            {count[0].mec_approval != "" ? (
                                    <Button 
                                    title = "Back"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={() => navigation.goBack()}
                                    
                                    
                                    />
                                ) : (
                                    
                                    <Button 
                                    title = "Apply"
                                    buttonStyle = {styles.buttonSignIn}
                                    titleStyle = {parameters.buttonTitle}
                                    onPress={() => {applyTask(); navigation.navigate("Confirm_Message");}}
                                    
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

export default Apply_Tasks

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