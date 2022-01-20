import React from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar} from 'react-native';
import {colors, parameters} from "../../GlobalStyle/styles"
import {Button} from 'react-native-elements';


const Landing = ({navigation}) => {


    return (

       <View style={styles.container}>
            <ImageBackground source={require('../../../assets/images/Landing.png')}  style={styles.background}>
                <StatusBar style="auto" />
                <View style = {styles.greeting}>
                    <Text style = {{fontSize:36, color: colors.text_white, fontWeight:'bold', marginLeft: 20, }}>Let's us...</Text>
                    <Text style = {{fontSize:26, color: colors.text_white, fontWeight:'bold', marginLeft: 30, padding: 10}}>Take care your car</Text>
                </View>

                <View style = {{flex:4}}>
                    <View style = {{justifyContent: 'space-evenly', marginBottom: 20}}>
                        <Button 
                            title = "Log In"
                            buttonStyle = {parameters.styledButton}
                            titleStyle = {parameters.text_white}
                            onPress={() => {
                                navigation.navigate("SignIn")
                            }}

                        />
                    </View>
                    

                    <View style = {{justifyContent: 'space-evenly', marginBottom: 20}}>
                        <Button 
                            title = "Registration"
                            buttonStyle = {styles.button}
                            titleStyle = {{color: "#1B82A3"}}
                            onPress={() => {
                                navigation.navigate("Register")
                            }}

                        />
                    </View>
                </View>
            </ImageBackground>
       </View>
       

    )
}

export default Landing

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
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#1B82A3",
        height: 50,
        width: '80%',
        marginLeft: "10%",
        backgroundColor: "transparent",
        fontWeight: 'bold'
    }
 
})