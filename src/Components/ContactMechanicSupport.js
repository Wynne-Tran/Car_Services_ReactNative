import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Alert, Switch, ImageBackground} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import {Avatar,Icon, Button} from 'react-native-elements'
import {colors} from '../GlobalStyle/styles'
import {auth} from '../../firebase'
import {db} from '../../firebase'
import { collection,addDoc,getDocs} from '@firebase/firestore'
import { useNavigation } from '@react-navigation/native'


const ContactMechanicSupport = (props) => {
    const navigation = useNavigation();
    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])
    const [user,setUser] = useState('');
    const [email,setEmail] = useState('')
    const [desc,setDesc] = useState('')
    const supportCollectionRef = collection(db, "support")

    const createSupport = async (user,email,desc) => {
         addDoc(supportCollectionRef, 
            {   
                user: user, 
                email: email,
                desc:desc
            })
      }

    async function handleSupport(user,email,desc){
        try {
            await createSupport(user,email,desc)
            .then(()=> {
                alert("Support ticket submitted.")
                navigation.goBack()
            })
        }catch(error){
            alert(error)
        }
        
    }    

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            const getUsers = async() => {
                const data = await getDocs(userCollectionRef)
                const data2 = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setUsers( data2.find(user => user.email === auth.currentUser.email))
              }
            getUsers()
        })
        return unsubscribe;
        
    }, [props])

    const handleSignOut = () => {
        auth
        .signOut()
        .then(props.navigation.navigate('SignIn'))
        .catch(error => Alert.alert(error.message))
    }

    return (
        <ImageBackground source={require('../../assets/images/Background.png')}  style={styles.background}>
            <View style = {styles.container}>
                <DrawerContentScrollView {...props} >
                    <View style = {{backgroundColor: colors.buttons,alignItems:'center'}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
                            <Avatar 
                                rounded
                                avatarStyle = {styles.avatar}
                                size = {85}
                                source = {{uri: users.image}}
                            />
                            <View style = {{marginLeft:10}}>
                                <Text style={{ marginLeft: 15, fontWeight:'bold', color:colors.cardbackground, fontSize:24}}>{users.username}</Text>
                                <Text style = {{color: colors.cardbackground, fontSize:14}}>{auth.currentUser.email}</Text>
                            </View>
                        </View>

                        <View>
                            <Button 
                                title = "Edit Profile"
                                buttonStyle = {styles.buttonSignIn}
                                titleStyle = {styles.buttonTitle}
                                onPress = {() => props.navigation.navigate("Edit_Profile")}
                                />
                        </View>

                        <View>
                            
                            <Text style={styles.supportText}>Create Support Ticket</Text>
                            <Text 
                            style={{paddingLeft:20,marginBottom:5}}>Username</Text>
                            <TextInput 
                            value={user}
                            onChangeText={text=>setUser(text)} 
                            style={styles.name} 
                            autoCorrect={false}
                            autoCapitalize='none'
                            />
                            <Text style={{paddingLeft:20,marginBottom:5}}>Email</Text>
                            <TextInput 
                            value={email}
                            onChangeText={text=>setEmail(text)} 
                            style={styles.email} 
                            autoCorrect={false}
                            autoCapitalize='none'
                            />
                            <Text style={{paddingLeft:20,marginBottom:5}}>What can we help with?</Text>
                            <TextInput 
                            style={styles.desc} 
                            value={desc}
                            onChangeText={text=>setDesc(text)} 
                            multiline
                            />
                            <Button 
                                title = "Send Support Ticket"
                                buttonStyle = {styles.sendSupport}
                                titleStyle = {styles.buttonTitle}
                                onPress = {() => handleSupport(user,email,desc)}
                                />
                        </View>
                    </View>     

                </DrawerContentScrollView>    
                             

                <DrawerItem 
                        style = {{marginLeft:'30%',marginBottom: 50,textAlign:'center'}}
                        label = "Sign Out"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "logout-variant"
                                color = {color}
                                size = {size}

                            />
                        )}
                        onPress={()=>handleSignOut()}
                    />

                
            </View>
        </ImageBackground>

    )
}

export default ContactMechanicSupport

const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    avatar: {
        borderColor: colors.pagebackground,
        
    },
    preferences : {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10, 
        paddingLeft: 20
    },
    SwitchText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darktheme: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10, 
        paddingLeft: 0,
        fontWeight: "bold",
    },
    background:{
        flex: 1, 
        width: "100%", 
        justifyContent: 'center', 
        backgroundColor: 'black', 
        resizeMode: 'cover',
     
    },
    buttonSignIn: {
        width: "45%", 
        alignItems: 'center', 
        marginLeft: "35%",
        borderRadius: 15,
        backgroundColor: colors.Card_DarkGrey,
        borderColor: colors.Card_DarkGrey,
        marginBottom:40
      },
      buttonTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3,
        backgroundColor: colors.Card_DarkGrey,
        borderColor: colors.Card_DarkGrey,
        borderWidth: 0
    },
    sendSupport: {
        width: "75%", 
        alignItems: 'center', 
        borderRadius: 10,
        height:40,
        backgroundColor: colors.Card_DarkGrey,
        borderColor: colors.Card_DarkGrey,
        marginLeft:25
      },
    supportText: {
        fontSize:20,
        fontWeight:'400',
        marginLeft:20,
        marginBottom:30,        
    }
      ,
    name:{
        borderWidth:2,
        borderColor:'grey',
        backgroundColor:'white',
        marginHorizontal:20,
        borderRadius:6,
        paddingLeft:15,
        height:30,
        width:200,
        marginBottom:15
      },
      email:{
        borderWidth:2,
        borderColor:'grey',
        backgroundColor:'white',
        marginHorizontal:20,
        borderRadius:6,
        paddingLeft:15,
        height: 45,
        height:30,
        width:200,
        marginBottom:15
      },
      desc:{
        borderWidth:2,
        borderColor:'grey',
        backgroundColor:'white',
        marginHorizontal:20,
        borderRadius:6,
        paddingLeft:10,
        height: 45,
        height:150,
        width:200,
        marginBottom:15,
      },
})
