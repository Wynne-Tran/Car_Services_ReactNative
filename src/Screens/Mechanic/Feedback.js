import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, ScrollView, Image  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors, parameters} from '../../GlobalStyle/styles'
import {Button} from 'react-native-elements'
import {Avatar} from 'react-native-elements'
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'

const Feedback = ({navigation}) => {

    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const serviceCollectionRef = collection(db, "bank_account")
    const [count, setCount] = useState(0)
    const [bankAccount, setBankAccount] = useState([])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUsers = async() => {
                const data = await getDocs(userCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers( data2.find(user => user.email === auth.currentUser.email))
              }
            getUsers()

            const countService = async() => {
                const data = await getDocs(serviceCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setCount(data2.filter(e => e.email === auth.currentUser.email).length)
                setBankAccount(data2.filter(e => e.mec_email === auth.currentUser.email));
            }
            countService()
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

                <HomeHeader navigation={navigation} role = "FeedBack"/>

                <View style={styles.message}>
                    <View style = {{alignItems: 'center', justifyContent: 'center', padding: 30}}>
                    <ScrollView>
                    {
                        bankAccount.map( e => e.cus_feedback != "" && (
                            <TouchableOpacity
                            >
                            <View style={styles.announment}>
                                <View style={{ marginHorizontal: 10}}>
                                    <Text style={{color: colors.text_white, fontSize: 20, fontWeight: 'bold'}}>{e.fullname} <Text style={{fontSize: 30}}>👋</Text> </Text>
                                    <Text style={{color: colors.text_white,}}> {e.cus_feedback}</Text>
                                    {
                                        parseFloat(e.cus_rate) <= 1 && <Image style={{marginLeft: -15}} source={require(`../../../assets/images/1_start.png`)}/>
                                        
                                    }
                                    {
                                        parseFloat(e.cus_rate) > 1 || parseFloat(e.cus_rate) <= 2 && <Image style={{marginLeft: -15}} source={require(`../../../assets/images/2_start.png`)}/>
                                       
                                    }
                                    {
                                        
                                        parseFloat(e.cus_rate) > 2 || parseFloat(e.cus_rate) == 3 && <Image style={{marginLeft: -15}} source={require(`../../../assets/images/3_start.png`)}/>
                        
                                    }
                                    {
                                        parseFloat(e.cus_rate) > 3 || parseFloat(e.cus_rate) >= 4 && <Image style={{marginLeft: -15}} source={require(`../../../assets/images/4_start.png`)}/>
                                        
                                    }
                                    {
                                        parseFloat(e.cus_rate) > 4 && <Image style={{marginLeft: -15}} source={require(`../../../assets/images/5_start.png`) }/>
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        ))
                    }
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
    card: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
    },
    message:{
        backgroundColor: colors.Card_DarkBlue,
        width: '90%',
        borderRadius: 20,
        marginLeft: "5%",
        height: 300,
        marginTop: 50
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
    announment:{
        backgroundColor: 'transparent',
        width: "90%",
        marginLeft: "5%",
        height: 100,
        marginTop: 20,
        flexDirection: 'row',
        borderBottomColor: colors.Card_DarkGrey,
        borderBottomWidth: 1,
        
    },
})



                    
