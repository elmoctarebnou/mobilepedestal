import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as AuthContext } from '../../context/AuthContext';

import AppTextInput from '../../components/appTextInput/AppTextInput';
import AppButton from '../../components/appButton/AppButton';
import DisplayMessage from '../../components/displayMessage/DisplayMessage';

import getStyles from './SignUp.styles';

const SignUp = ({ navigation }) => {

    const { signUp } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const styles = StyleSheet.create(getStyles());

    const onSignUp = async () => {
        const error = await signUp(username, password, email);
        if (error && error.message) setErrorMessage(error.message);
        else navigation.navigate('ConfirmSignUp');
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Create a new account</Text>
                <AppTextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    leftIcon="account"
                    placeholder="Enter username"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <AppTextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    leftIcon="lock"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                />
                <AppTextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    leftIcon="email"
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                {errorMessage && <DisplayMessage message={errorMessage}/>}
                <AppButton title="Sign Up" onPress={onSignUp} />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text style={styles.forgotPasswordButtonText}>
                            Already have an account? Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
