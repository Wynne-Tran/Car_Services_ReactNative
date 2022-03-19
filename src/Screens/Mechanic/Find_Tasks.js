import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, TouchableOpacity  } from 'react-native'
import HomeHeader from '../../Components/HomeHeader'
import {colors} from '../../GlobalStyle/styles'
import {auth, db} from '../../../firebase'
import { collection, getDocs} from  '@firebase/firestore'
import TimeTable from '@mikezzb/react-native-timetable';
import moment from 'moment'


const Find_Tasks = ({navigation}) => {

  const userCollectionRef = collection(db, "users")
  const [users, setUsers] = useState([])
  const serviceCollectionRef = collection(db, "bank_account")
  const [count, setCount] = useState([])
  const [eventGroups, setEventGroups] = useState([])


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
                setCount(data2.filter(e => e.mec_approval == "" && e.status == ""))
                const events = data2.map(e => ({
                  courseId: e.service.length <= 4 ? e.service.map(title => title.label + "\n") : `${e.service.length} Services` ,
                  title: e.fullname,
                  section: e.id,
                  day: parseInt(moment(e.appointmentAt).format('d')),
                  startTime:  moment(e.appointmentAt).format('hh:mm'),
                  endTime: moment(e.appointmentAt).add(e.total_time_works, 'hour').format('hh:mm'),
                  location: e.address, 
                  color: (e.mec_approval == "" ? 'rgba(241, 153, 40, 1)' : 
                            (e.mod_approval == "" ? 'rgba(255, 111, 199, 1)' : 
                            (e.status != "Done" ? 'rgba(3, 218, 197, 1)' : 'rgba(102, 204, 255, 1)')))
                }))
                setEventGroups(events)
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

                <HomeHeader navigation={navigation} role = "View Submission"/>

                <View style={{flexDirection: "column", marginLeft: 60}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.colorwait}></View>
                        <Text>Wait...</Text>

                        <View style={styles.colorapprove}></View>
                        <Text>Approved</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.colorInprocess}></View>
                        <Text>Process...</Text>

                        <View style={styles.colorDone}></View>
                        <Text>Done...</Text>
                    </View>
                </View>
                <View style={styles.calendar}>
                  <TimeTable
                    events={eventGroups}
                    eventOnPress={(event) => navigation.navigate("Apply_Tasks", {id: event.section})}
                    
                />
                </View>
     
            </View>
        </ImageBackground>
    )
}

export default Find_Tasks



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
        height: 350,
        marginTop: 5
    },
    calendar:{
        flex: 1,
        paddingBottom: 80,
       
    },
    colorwait: {
        backgroundColor: '#f19928',
        width: 15,
        height: 15,
        marginLeft: 30,
        marginBottom: 10,
        marginRight: 5
    },
    colorapprove: {
        backgroundColor: '#ff6fc7',
        width: 15,
        height: 15,
        marginLeft: 40,
        marginBottom: 10,
        marginRight: 5
    },
    colorInprocess: {
        backgroundColor: '#03dac5',
        width: 15,
        height: 15,
        marginLeft: 30,
        marginBottom: 10,
        marginRight: 5
    },
    colorDone: {
        backgroundColor: '#66ccff',
        width: 15,
        height: 15,
        marginLeft: 30,
        marginBottom: 10,
        marginRight: 5,
        marginLeft: 30
    },
})