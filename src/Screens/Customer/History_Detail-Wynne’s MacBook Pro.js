import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'
import {Button} from 'react-native-elements'
import moment from 'moment'


const History_Detail = ({navigation, route}) => {

    console.log()
    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const serviceCollectionRef = collection(db, "bank_account")
    const [count, setCount] = useState(route.params.bank_account)

    useEffect(() => {
        const getUsers = async() => {
            const data = await getDocs(userCollectionRef)
            const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setUsers( data2.find(user => user.email === auth.currentUser.email))
          }
        getUsers()
    }, [])

    
    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "History Detail"/>
    
                <View style={styles.message}>
                <Text style={{color: colors.text_white, fontSize: 20, fontWeight: 'bold', paddingVertical: 10, marginLeft: 30}}>Review Submission</Text>
                    <View style = {{alignItems: 'center'}}>
                        <View style={{width: 200, justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 50, backgroundColor: "#C8372D"}}>
                            <Text style={{color: colors.text_white, fontSize: 18, alignItems: 'center', fontWeight: 'bold'}}>{count.service.length} Services</Text>
                        </View>
                    </View>
                <View style = {{paddingVertical: 10}}>
                    <Text style={{color: "#C8372D", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>Customer</Text>
                    <View style={{marginLeft: 15, marginRight: 10}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{users.username}</Text>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>Phone: {users.phone}</Text>
                        </View>
                        <Text style = {{color: colors.text_white, fontSize: 15}}>{users.address}</Text>
                    </View>
                </View>

                <View>
                    <Text style={{color: colors.text_white, fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>Pay Bill</Text>
                    <View style={{marginLeft: 15, marginRight: 10}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>${count.checkout}</Text>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{moment(count.createAt).format("DD/MM/YYYY")}</Text>
                        </View>
                    </View>
                </View>

                <View style = {{marginVertical: 10}}>
                    <Text style={{color: colors.text_white, fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>Appointment</Text>
                    <View style={{marginLeft: 15, marginRight: 10}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{moment(count.appointmentAt).format("DD/MM/YYYY")}</Text>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{moment(count.appointmentAt).format('hh:mm')}</Text>
                        </View>
                    </View>
                </View>

                <View style = {{marginVertical: 10}}>
                    <View style = {{alignItems: 'center'}}>
                        <View style={{width: '60%', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 50, backgroundColor: "#2264D1"}}>
                            <Text style={{color: colors.text_white, fontSize: 18, alignItems: 'center', fontWeight: 'bold'}}> 🚗 {users.vehicle}</Text>
                        </View>
                    </View>
                </View>

                <View style = {{paddingVertical: 10}}>
                    <Text style={{color: "#2264D1", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>Mechanic</Text>
                    <View style={{marginLeft: 15, marginRight: 10}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{count.mec_approval}</Text>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{count.mec_phone}</Text>
                        </View>
                    </View>
                </View>

                <View style = {{marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: colors.text_white, fontSize: 15, marginLeft: 10, fontWeight: 'bold'}}>Date</Text>
                    <Text style = {{color: colors.text_white, fontSize: 15, marginRight: 10}}>{count.day_approval}</Text>
                </View>

                <View style = {{paddingVertical: 10}}>
                    <Text style={{color: "#2264D1", fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>Status</Text>
                    <View style={{marginLeft: 15, marginRight: 10}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style = {{color: colors.text_white, fontSize: 15}}>{count.status == "" ? "In Process" : count.status}</Text>
                        </View>
                    </View>
                </View>

                </View>

         

                <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                    
                    <Button 
                        title = "Home"
                        buttonStyle = {styles.buttonSignIn}
                        titleStyle = {parameters.buttonTitle}
                        onPress={() => navigation.navigate("Home_Customer")}
                        
                    />
                </View> 
            </View>
        </ImageBackground>
    )
}

export default History_Detail

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
        height: 580,
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