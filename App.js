import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Button,
  StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';


// IMPORT COMPONENTS
import LoginForm from './components/login/LoginForm';
import Firebase from "./components/login/Firebase";
import * as firebase from "firebase";
import InterestScreen from './components/registration/InterestsPage'; 




class LoginFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'LoginForm',
  });

  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        response: ""
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup() {
    try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

        this.setState({
            response: "Account Created"
        });
        alert(this.state.response);
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }

  async login() {
    try {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({
            response: "Logged In!"
        });
        alert(this.state.response)
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

            <StatusBar barStyle="light-content"/>

            <TextInput style = {styles.input}
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email or Mobile Num'
                        onChangeText ={(email) => this.setState({email})}
                        placeholderTextColor='rgba(225,225,225,0.7)'/>

            <TextInput style = {styles.input}
                       returnKeyType="go" ref={(input)=> this.passwordInput = input}
                       placeholder='Password'
                       onChangeText ={(password) => this.setState({password})}
                       placeholderTextColor='rgba(225,225,225,0.7)'
                       secureTextEntry/>
             <Button onPress={() => navigate('Interest')} title="INTEREST PAGE" />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.signup}>
                <Text  style={styles.buttonTextSignUp}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                <Text  style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button onPress={() => navigate('Interest')} title="INTEREST PAGE" />
      </View>
    );
  }
}






// routes takes components "acts like a navbar"
export const SimpleApp = StackNavigator({
  LoginForm: { screen: LoginFormScreen },
  Interest: { screen: InterestScreen },
//   Profile: { screen: ProfileScreen },
//   Details: { screen: DetailsScreen },
});


export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3498db',
     // padding: 20,
     // marginBottom: 10,

    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        marginBottom: 5,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        // fontWeight: '700',
        paddingBottom:10
    },
    buttonTextSignUp:{
        color: 'orange',
        textAlign: 'center',
        // fontWeight: '700',
        paddingBottom:10
    },

    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    },
    title:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'

  }

});


