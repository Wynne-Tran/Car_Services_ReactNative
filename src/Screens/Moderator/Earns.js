import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity,  } from 'react-native'
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


const Earns= ({navigation}) => {

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
            setCount(data2.filter(e => e.mod_email=== auth.currentUser.email))
        }
        countService()
        
    }, [navigation])

    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "History Earns"/>

                <View style={styles.message}>
                <ScrollView>
                    {count.map(e => (
                    <View key = {e.id}   style={{width: 320, height: 50, backgroundColor: colors.Card_Violet, borderRadius: 12, marginTop: 10, alignItems: 'center'}}>
                        <TouchableOpacity
                            key = {e.id}
                            onPress={()=> navigation.navigate("History_Detail", {id: e.id})}
                        >
                            <View style={{flexDirection: 'row', width: 300, height: 60, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 20}}>{moment(e.appointmentAt).format('DD-MM-YYYY')}</Text> 
                                <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 10}}>{e.service.length} Services</Text>
                                <Text style={{color: 'red', fontSize: 14, fontWeight: 'bold', marginRight: 10}}>Total ${parseFloat(e.payment) - parseFloat(e.mec_payment)}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                    ))}

                    </ScrollView>
                    
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

export default Earns

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

