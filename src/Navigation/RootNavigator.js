import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet} from 'react-native'
import AuthNavigators from './AuthNavigators'

const RootNavigators = () => {
    return (
        <NavigationContainer>
            <AuthNavigators/>
        </NavigationContainer>
    )
}

export default RootNavigators

const styles = StyleSheet.create({})