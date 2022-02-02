import React from 'react'
import { StyleSheet, StatusBar, View, ImageBackground} from 'react-native';
import { Icon, Button} from 'react-native-elements';


const Register = ({navigation}) => {
    return (

       <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/Landing.png')}  style={styles.background}>
            <StatusBar style="auto" />
                <View style = {styles.greeting}>

                    <View style = {{justifyContent: 'space-evenly', marginBottom: 20}}>
                        <Button 
                            title = "Moderator"
                            buttonStyle = {styles.button}
                            titleStyle = {{color: "#1B82A3", fontWeight: 'bold', fontSize: 34}}
                            onPress = {() => {navigation.navigate("RegisterForm", {title: "Moderator"})}}
                        />
                    </View>
                    
                    <View style = {{justifyContent: 'space-evenly', fontWeight: 'bold', marginBottom: 20}}>
                        <Button 
                            title = "Customer"
                            buttonStyle = {styles.button}
                            titleStyle = {{color: "#1B82A3", fontWeight: 'bold', fontSize: 34}}
                            onPress = {() => {navigation.navigate("RegisterForm", {title: "Customer"})}}
                        />
                    </View>


                    <View style = {{justifyContent: 'space-evenly', marginBottom: 20}}>
                        <Button 
                            title = "Mechanic"
                            buttonStyle = {styles.button}
                            titleStyle = {{color: "#1B82A3", fontWeight: 'bold', fontSize: 34}}
                            onPress = {() => {navigation.navigate("RegisterForm", {title: "Mechanic"})}}
                        />
                    </View>

                    <View style = {{justifyContent: 'space-evenly', marginBottom: 20}}>
                        <Icon 
                            type = "material-community"
                            color = "#1B82A3"
                            name = "arrow-left"
                            size = {32}
                            onPress = {() => {navigation.goBack()}}
                            
                        />
                            
                    </View>
                </View>
            </ImageBackground>
       </View>
       

    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    background:{
        flex: 1, 
        width: "100%", 
        justifyContent: 'center', 
        backgroundColor: 'black', 
        resizeMode: 'cover'
    },
    greeting: {
        flex: 3, 
        marginTop: 450
    },
    button: {
        
        borderColor: "#1B82A3",
        height: 65,
        width: '80%',
        marginLeft: "10%",
        backgroundColor: "transparent",
        fontWeight: 'bold'
    }
 
})