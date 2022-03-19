import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Alert  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import { CheckBox, Icon, Button} from 'react-native-elements';
import { LogBox } from 'react-native';
import { collection, getDocs, updateDoc, doc} from  '@firebase/firestore'
import {auth, db} from '../../../firebase'
import moment from 'moment'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);


const History_Tasks = ({navigation}) => {

    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const serviceCollectionRef = collection(db, "bank_account")
    const [count, setCount] = useState([])
    const [check, setCheck] = useState(false);

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
            setCount(data2.filter(e => e.mod_email === auth.currentUser.email))
        }
        countService()
        
    }, [navigation])

    console.log(count[0])
    const confirmTask = async() => {
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
            status: "Done",
            createAt: count[0].createAt,
            mec_name : users.fullname,
            mec_approval: count[0].mec_approval,
            mec_phone: users.phone,
            mec_email: users.email,
            mec_message: "Thank you for booking services, please give me your Feedback !",
            mec_salary: users.salary,
            mod_approval: count[0].mod_approval,
            day_approval: count[0].day_approval,
            total_time_works: count[0].total_time_works,
            mec_payment:  count[0].mec_payment
        }
        await updateDoc(bankDoc, updateBankAccount)
        setCheck(true);
    }

    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "History Tasks"/>
            

                <View>

                    <View style={styles.message}>
                        <ScrollView>
                            {count[0] != undefined && count.map(e => (
                            <View key = {e.id} style={{width: 320, height: 50, backgroundColor: colors.Card_Violet, borderRadius: 12, marginTop: 10, alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', width: 300, height: 60, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center'}}>
                                
                                    {check == false && e.status != "Done" ? (
                                        <>
                                         
                                        <CheckBox
                                            checkedColor={colors.Card_Violet}
                                            checkedIcon="dot-circle-o"
                                            uncheckedIcon="circle-o"
                                            checked= {e.isChecked}
                                            onPress = {() => confirmTask()}
                                            
                                        />
                                        <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 10}}>{e.service.length} Services</Text>
                                        <Text style={{fontSize: 14, color: 'red', fontWeight: 'bold', marginRight: 10}}>{e.address}</Text>
                                        <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 10}}>{moment(count[0].appointmentAt).format("DD/MM/YYYY")}</Text>
                                       
                                        </>
                                    ) : (
                                        <>
                                            <CheckBox
                                                //center
                                                style = {{textDecorationLine: 'line-through'}}
                                                checkedColor={colors.Card_Violet}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checked= {true}
                                                onPress = {() => confirmTask()}
                                                
                                            />
                                            <Text style={{textDecorationLine: 'line-through', fontSize: 14, color: 'red', fontWeight: 'bold', marginRight: 10}}>{e.service.length}</Text>
                                            <Text style={{textDecorationLine: 'line-through', fontSize: 14, color: 'red', fontWeight: 'bold', marginRight: 10}}>{e.address}</Text>
                                            <Text style={{textDecorationLine: 'line-through', fontSize: 14, fontWeight: 'bold', marginRight: 10}}>{moment(count[0].appointmentAt).format("DD/MM/YYYY hh:mm")}</Text>
                                        </>
                                    )}
                                    
                                </View>
                            </View>

                            ))}

                            </ScrollView>
                    

                    </View>

                </View>

                <View style = {{flexDirection: "row", marginLeft: 20, marginHorizontal: 20, marginTop: 30, justifyContent: 'space-evenly'}}>
                    
                    <Button 
                        title = "Home"
                        buttonStyle = {styles.buttonSignIn}
                        titleStyle = {parameters.buttonTitle}
                        onPress={() => navigation.goBack()}
                        
                    />
                </View> 
            </View>
        </ImageBackground>
    )
}

export default History_Tasks

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
        height: 350,
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

