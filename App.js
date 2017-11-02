// NOTE: LOGIN AND LoginForm ARE NOT USE FOR THIS PROJECT
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
import { FormLabel, FormInput } from 'react-native-elements';
//import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


// IMPORT COMPONENTS
import * as firebase from "firebase";
import InterestScreen from './components/registration/InterestsPage'; 
import BiographyScreen from './components/registration/Biography'; 
import ImageUploadScreen from './components/registration/ImageUpload'; 
import UserWithSimilarInterestsScreen from './components/userViews/UserWithSimilarInterests'; 




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
        //send userId to the user table to create a new node within the user table, the new node will hold the userid ex: id: 234 everytime to fill this 
        this.setState({
            response: "Account Created"
        });
        
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    } finally {
      alert(this.state.response);
    }
  }

  async login() {
    const { navigate } = this.props.navigation;
  

    try {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({
            response: "Logged In!"
        });
        // console.log(this.state.response)
        let runThis = () => navigate('Interest');
        runThis();
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    } finally {
      alert(this.state.response);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

            <Button  
                 large
                 onPress={() => navigate('Interest')} 
                 buttonStyle={{backgroundColor:'#2980b6'}}
                 textStyle={{textAlign: 'center'}}
                 //icon={{name: 'star-half-full', type: 'font-awesome', color:'#D4AF37', size:32}}
                 title="INTEREST PAGE"                 
                 
                 />
            <Text style={styles.Heading}>Email or Mobile Num</Text>
            <FormInput style = {styles.input}
                        underlineColorAndroid="white"
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Please enter your email here..'
                        onChangeText ={(email) => this.setState({email})}
                        placeholderTextColor='rgba(225,225,225,0.7)'/>
            
            <Text style={styles.Heading}>Password</Text>
            <FormInput style = {styles.input2}
                       returnKeyType="go" ref={(input)=> this.passwordInput = input}
                       placeholder='Please enter your password here..'
                       onChangeText ={(password) => this.setState({password})}
                       placeholderTextColor='rgba(225,225,225,0.7)'
                       secureTextEntry/>
          <TouchableOpacity style={styles.buttonContainer2} onPress={this.signup}>
                <Icon name="home" style={styles.icon1} size={25}>
                <Text  style={styles.buttonTextSignUp}>  Start Now</Text>
                </Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                <Icon name="sign-in" style={styles.icon1} size={25}>
                <Text  style={styles.buttonTextSignUp}>  Login</Text>
                </Icon>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainerGo}  onPress={() => navigate('Interest')}>
                <Text  style={styles.buttonText}>GO TO INTEREST PAGE</Text>
            </TouchableOpacity>
{/*FOR DEVELOPMENT PURPOSES*/}
            <TouchableOpacity style={styles.buttonContainerGo}  onPress={() => navigate('similarIterests')}>
                <Text  style={styles.buttonText}>GO TO SIMILAR ITERESTS PAGE</Text>
            </TouchableOpacity>
      </View>
    );
  }
}






// routes takes components "acts like a navbar"
export const SimpleApp = StackNavigator({
  LoginForm: { screen: LoginFormScreen },
  Interest: { screen: InterestScreen },
  Biography: { screen: BiographyScreen },
  ImageUpload: { screen: ImageUploadScreen },
  similarIterests: { screen: UserWithSimilarInterestsScreen },
});


export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCY8jEbXh9Lkj7yfvxz-e0-7XbZ3iSiTg8",
    authDomain: "interestesapp.firebaseapp.com",
    databaseURL: "https://interestesapp.firebaseio.com",
    projectId: "interestesapp",
    storageBucket: "interestesapp.appspot.com",
    messagingSenderId: "505255925049"
  };
  firebase.initializeApp(config);

var user = firebase.auth().currentUser;
if (user != null) {
  var uid = user.uid;
  console.log('current user ID: ', uid);
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3498db',

    },
    Heading:{
     fontSize:12,
     color:'white',
     marginLeft:17,
     //marginTop:20,
     paddingTop:10,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        //marginTop:1,
        //marginBottom:5,
        padding: 10,
        color: '#fff'
    },
    input2:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom:10,
        padding: 10,
        color: '#fff'
    },
    icon1:{
        height:45,
        //width:45,
        color:'white',
        padding: 10,
        marginLeft:140,
        //marginRight:50,
        justifyContent: 'center',

    },
    buttonContainer2:{

        height:50,
        borderColor: '#2980b6',
        borderWidth: 1,
        borderRadius: 100,
        //alignSelf: 'stretch',
        backgroundColor: '#2980b6',
        //paddingVertical: 15,
        marginBottom: 5,
        marginTop:30,
        justifyContent: 'center',
        //alignItems: 'center',
    },
    buttonContainer:{

        height:50,
        borderColor: '#2980b6',
        borderWidth: 1,
        borderRadius: 100,
        //alignSelf: 'stretch',
        backgroundColor: '#2980b6',
        //paddingVertical: 15,
        marginBottom: 5,

        justifyContent: 'center',
        //alignItems: 'center',
    },
    buttonContainerGo:{
        backgroundColor: '#06b3e2',
        paddingVertical: 15,
        marginBottom: 5,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        // fontWeight: '700',
        fontFamily:'font-awesome',
        paddingBottom:10
    },
    buttonTextSignUp:{
        color: 'orange',
        fontSize:15,
        //textAlign: 'center',
        // fontWeight: '700',
        marginLeft:100,
        marginBottom:50,
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


