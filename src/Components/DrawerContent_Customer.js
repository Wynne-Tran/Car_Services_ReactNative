import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Linking, Pressable, Alert, Switch, ImageBackground} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import {Avatar,Icon, Button} from 'react-native-elements'
import {colors} from '../GlobalStyle/styles'
import {auth} from '../../firebase'
import {db} from '../../firebase'
import { collection, getDocs} from  '@firebase/firestore'


const DrawerContent_Customer = (props) => {

    const userCollectionRef = collection(db, "users")
    const [users, setUsers] = useState([])

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
                    <View style = {{backgroundColor: colors.buttons}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingVertical: 10}}>
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

                        <View >
                            <Button 
                                title = "Edit Profile"
                                buttonStyle = {styles.buttonSignIn}
                                titleStyle = {styles.buttonTitle}
                                onPress = {() => props.navigation.navigate("Edit_Profile")}
                            />
                        </View>
                
                    </View>

                    

                    <DrawerItem 
                        label = "Home"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "home"
                                color = {color}
                                size = {size}

                            />
                        )}
                        onPress={() => props.navigation.navigate("Home_Customer")}
                    />

                    <DrawerItem 
                        label = "Services"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "tag-heart"
                                color = {color}
                                size = {size}

                            />
                        )}
                        onPress = {() => props.navigation.navigate("Services")}
                    />

                    <DrawerItem 
                        label = "History Services"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "server"
                                color = {color}
                                size = {size}

                            />
                        )}
                        onPress={() => props.navigation.navigate("History_Services")}
                    />

                    <DrawerItem 
                        label = "Change Password"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "shield-account"
                                color = {color}
                                size = {size}

                            />
                        )}
                        onPress = {() => props.navigation.navigate("Change_Password")}
                    />
                    <DrawerItem 
                        label = "Contact Support"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "piggy-bank"
                                color = {color}
                                size = {size}
                            />
                        )}
                        onPress={() => props.navigation.navigate("Contact_Customer_Support")}
                    /> 
                    
                </DrawerContentScrollView>

                <DrawerItem 
                        style = {{marginBottom: 30}}
                        label = "Sign Out"
                        icon = {({color, size}) => (
                            <Icon 
                                type = "material-community"
                                name = "logout-variant"
                                color = {color}
                                size = {size}

                            />
                        )}
                        onPress={handleSignOut}
                    />

                
            </View>
        </ImageBackground>

    )
}

export default DrawerContent_Customer

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
    }
})
