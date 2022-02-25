import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, ScrollView  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import { Icon, Button} from 'react-native-elements';
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'
import moment from 'moment';


const History_Services = ({navigation}) => {
    
    const serviceCollectionRef = collection(db, "bank_account")
    const [users, setUsers] = useState([])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            const userService = async() => {
                const data = await getDocs(serviceCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            }
            userService()
        })
        return unsubscribe;
        
    }, [navigation])

    return (
        <ImageBackground source={require('../../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "History Services"/>

                <View style={styles.message}>
                <ScrollView>
                    {users.map(e => (
                    <View key = {e.id}   style={{width: 320, height: 50, backgroundColor: colors.Card_Violet, borderRadius: 12, marginTop: 10, alignItems: 'center'}}>
                        <TouchableOpacity
                            key = {e.id}
                            onPress={()=> navigation.navigate("History_Detail", {bank_account: e})}
                        >
                            <View style={{flexDirection: 'row', width: 300, height: 60, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 20}}>{moment(e.createAt).format('DD-MM-YYYY')}</Text> 
                                <Text style={{color: 'red', fontSize: 14, fontWeight: 'bold', marginRight: 10}}>{e.service.length} Services Booking</Text>
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

export default History_Services

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
        height: 400,
        marginTop: 50,
        alignItems: 'center'
    },
    buttonSignIn: {
        backgroundColor: colors.Card_Violet,
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

