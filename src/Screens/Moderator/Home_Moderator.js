import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity, Image, ScrollView  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors} from '../../GlobalStyle/styles'
import {Avatar, Icon, withBadge} from 'react-native-elements'
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'

const Home_Moderator = ({navigation}) => {

    
    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)
    const BadgeIcon = withBadge(count)(Icon)
    const [activeMec, setActiveMec] = useState([])
 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUsers = async() => {
                const data = await getDocs(userCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                data2.forEach(activeMec => activeMec.activeMechanic == "No" ? setCount(count + 1) : null)
                setUsers(data2.find(user => user.email === auth.currentUser.email))
                setActiveMec(data2.filter(user => user.activeMechanic === "No"))
              }
            getUsers()
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
    
                <View style = {{flexDirection: 'row', alignItems: 'center', paddingLeft: 40, }}>
                    
                    <Avatar 
                        rounded
                        avatarStyle = {styles.avatar}
                        size = {85}
                        source = {{uri: users.image}}
                    />
                    
                    <View style = {{marginLeft:20}}>
                        <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.text_orange, fontSize:24}}>{users.username}</Text>
                        <Text style = {{color: colors.text_orange, fontSize:14}}>{auth.currentUser.email}</Text>
                    </View>
                </View>

                <TouchableOpacity style = {{marginLeft: '5%', marginVertical: 5, backgroundColor: colors.Card_Orange, height: 60, width: '90%', borderRadius: 50, paddingLeft: 30}}
                    onPress={() => navigation.navigate("View_Submission")}
                >
                    <View style={styles.card}>
                        <View style = {{alignItems : "center", justifyContent:'center'}}>
                            <Image style={{flex: 1, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Calendar.png')}/>
                        </View>

                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: colors.text_blue, fontSize: 16, fontWeight: 'bold'}}>Approve Submission</Text>
                        </View>

                        <View style = {{alignItems: 'center', justifyContent: 'center', marginRight: 25}}>
                            <BadgeIcon 
                                type = "material-community"
                                name = "bell"
                                size = {30}
                                color = {colors.cardbackground}
                            
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style = {{marginLeft: '5%', marginVertical: 5, backgroundColor: colors.Card_DarkGrey, height: 60, width: '90%', borderRadius: 50, paddingLeft: 30}}
                    onPress={() => navigation.navigate("Earns")}
                >
                    <View style={styles.card}>
                        <View style = {{alignItems : "center", justifyContent:'center'}}>
                            <Image style={{flex: 1, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Calculate.png')}/>
                        </View>

                        <View style = {{alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{color: colors.text_orange, fontSize: 20, fontWeight: 'bold'}}>Earns</Text>
                        </View>
                        <View style = {{alignItems: 'center', justifyContent: 'center', marginRight: 15}}></View>
                            
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style = {{marginLeft: '5%', marginVertical: 5, backgroundColor: colors.Card_Black, height: 60, width: '90%', borderRadius: 50, paddingLeft: 30}}
                    onPress={() => navigation.navigate("History_Task")}
                >
                    <View style={styles.card}>
                        <View style = {{alignItems : "center", justifyContent:'center'}}>
                            <Image style={{flex: 1, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Folder.png')}/>
                        </View>

                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: colors.text_orange, fontSize: 20, fontWeight: 'bold'}}>History Tasks</Text>
                        </View>
                        <View style = {{alignItems: 'center', justifyContent: 'center', marginRight: 15}}></View>
                            
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate("Oversea_Service")}
                    style = {{marginLeft: '5%', 
                            marginVertical: 5, 
                            backgroundColor: colors.Card_LightGrey, 
                            height: 60, 
                            width: '90%', 
                            borderRadius: 50, 
                            paddingLeft: 30}}
                >
                    <View style={styles.card}>
                        <View style = {{alignItems : "center", justifyContent:'center'}}>
                            <Image style={{flex: 1, aspectRatio: 0.7, resizeMode: 'contain'}} source={require('../../../assets/images/Accurate.png')}/>
                        </View>

                        <View style = {{alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
                            <Text style={{color: colors.text_blue, fontSize: 20, fontWeight: 'bold'}}>Oversee Service</Text>
                        </View>
                        <View style = {{alignItems: 'center', justifyContent: 'center', marginRight: 15}}></View>
                            
                    </View>
                </TouchableOpacity>
               
                <View >
                    <Text style={{color: colors.text_black, fontSize: 30, fontWeight: 'bold', marginLeft: 15}}>Messages</Text>
                </View>
                <View style={styles.message}>
                    <ScrollView>
                        {activeMec.map(active => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Active_Mec_Account", {data: activeMec, id: active.id})}
                            >
                            <View style={styles.announment} key={active.id}>
                                <Avatar 
                                    rounded
                                    avatarStyle = {styles.avatar}
                                    size = {55}
                                    source = {{uri: active.image}}
                                />
                                <View style={{ marginHorizontal: 10}}>
                                    <Text style={{color: colors.text_white, fontSize: 20, fontWeight: 'bold'}}>{active.username} <Text style={{fontSize: 30}}>👋</Text> </Text>
                                    <Text style={{color: colors.text_white,}}>Plese active account for me ! </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Home_Moderator

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
        width: "90%",
        borderRadius: 20,
        marginLeft: "5%",
        height: 260,
        marginTop: 5
    },
    announment:{
        backgroundColor: 'transparent',
        width: "90%",
        marginLeft: "5%",
        height: 70,
        marginTop: 20,
        flexDirection: 'row',
        borderBottomColor: colors.Card_DarkGrey,
        borderBottomWidth: 1,
        
    },
})
