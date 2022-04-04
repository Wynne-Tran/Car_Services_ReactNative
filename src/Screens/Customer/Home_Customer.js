import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors} from '../../GlobalStyle/styles'
import {Avatar, Button} from 'react-native-elements'
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler'

const Home_Customer = ({navigation}) => {

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
                setBankAccount(data2.filter(e => e.email === auth.currentUser.email));
            }
            countService()
        })
        return unsubscribe;
        
    }, [navigation])

    return (
        <ImageBackground source={require('../../../assets/images/plainBg.png')}  style={styles.background}>
            <View style = {styles.container}>
                <StatusBar 
                    translucent
                    barStyle='light-content'
                    backgroundColor="rgba(255, 140, 82, 1)"
                />

                <HomeHeader navigation={navigation} role = "Home"/>
    
                <View style={styles.message}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Edit_Profile")}
                    >
                        <View style={styles.editButton}>
                            <Text style ={{color: colors.text_white, fontWeight: 'bold'}}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center'}}>
                        <View style = {{flexDirection: 'column', alignItems: 'center', marginTop: -28}}>
                            
                            <View>
                            <Avatar 
                                rounded
                                avatarStyle = {styles.avatar}
                                size = {65}
                                source = {{uri: users.image}}
                            />
                            
                            </View>
                            <View >
                                <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.text_white, fontSize:30}}>{users.username}</Text>
                                <Text style = {{color: colors.text_white, fontSize:14}}>{auth.currentUser.email}</Text>
                            </View>
                            
                        </View>
                        
                        <View style={{alignItems: 'center'}}>
                            <Text style = {{color: colors.text_white, fontSize:18, marginHorizontal: 10}}>
                                You requested <Text style={{fontSize: 25, fontWeight: 'bold', color:'red'}}>{count}</Text> services !
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.announment}>
                    <ImageBackground source={require('../../../assets/images/mini.png')}  style={styles.background2}>
                    </ImageBackground>
                </View>

                <View >
                    <Text style={{color: colors.text_black, fontSize: 30, fontWeight: 'bold', marginLeft: 15}}>Messages</Text>
                </View>

                <View style={styles.announment2}>
                    <ScrollView style={{padding: 10}}>
                        {
                            bankAccount.map(e => e.mec_message != "" ? (
                                <>
                                    <TouchableOpacity style={styles.message_red}
                                        key = {e.id}
                                        onPress={() => navigation.navigate('Feedback', {info: e})}
                                    >
                                        <ImageBackground source={require('../../../assets/images/Green.png')}  style={styles.background2}>
                                            <Text style={{color: colors.text_white, marginLeft: '20%', fontSize: 14}}>{e.mec_message}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </>
                                
                            ) : 
                            e.mod_approval != "" &&
                            <TouchableOpacity style={styles.message_red}
                                    onPress={() => navigation.navigate('History_Detail')}
                                    key = {e.id}
                                >
                                    <ImageBackground source={require('../../../assets/images/info.png')}  style={styles.background2}>
                                        <Text style={{color: colors.text_white, marginLeft: '20%', fontSize: 14}}>Your Booking was approved !</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                    
                        }
                        
                    </ScrollView>
                </View>
                
            </View>
        </ImageBackground>
    )
}

export default Home_Customer

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
    background2:{
        flex: 1, 
        width: "100%", 
        height: "auto",
        justifyContent: 'center', 
        backgroundColor: 'transparent', 
        resizeMode: 'cover',
        borderRadius: 12
    },
    card: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
    },
    message:{
        backgroundColor: colors.Card_DarkBlue,
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 210,
        marginTop: 20,
        marginBottom: 20
    },
    
    editButton: {
        width:80, 
        height: 40, 
        backgroundColor: colors.Card_Orange, 
        alignSelf:'flex-end', 
        borderRadius: 8, 
        marginTop: 15, 
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    announment:{
        backgroundColor: 'transparent',
        width: 380,
        height: 200,
        marginVertical: 20,
        justifyContent: 'center', 
        resizeMode: 'contain',
        
    
    },
    announment2:{
        backgroundColor: 'transparent',
        borderColor: colors.Card_DarkBlue,
        borderStyle: 'dashed',
        borderWidth: 2,
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 150,
        marginTop: 20,
        
    },
    message_red: {
        width: '100%',
        height: 60,
    }
})
