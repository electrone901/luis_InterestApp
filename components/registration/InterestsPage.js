import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';





const mockData = [
    {
        label: 'label1',
        value: 'one'
    },
    {
        label: 'label2',
        value: 'two'
    },
    {
        label: 'label3',
        value: 'three'
    },
];
 

const onButtonPress = () => {
  Alert.alert('Link to Auth');
};


export default class InterestsScreen extends Component {
  static navigationOptions = {
    title: 'Interest',
  };
  _onSelect = ( item ) => {
      console.log(item);
    };

    constructor(props) {
      console.log('InterestsPage')
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
                <Text style={styles.title}>INTEREST</Text>
                <Text style={styles.title}>Choose at least 3 topics:</Text>
                <View style={styles.CheckboxFormX} >
              <CheckboxFormX
                  style={{ width: 350 - 30 }}
                  dataSource={mockData}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={16}
                  iconColor='red'
                  formHorizontal={true}
                  labelHorizontal={false}
                  onChecked={(item) => this._onSelect(item)}
              />

          </View>
                
                

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
                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}

                 <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })} title="Chat with Lucy"/>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.signup}>
                    <Text  style={styles.buttonTextSignUp}>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}  onPress={this.login}>
                    <Text  style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
     padding: 20,
     marginBottom: 10,

    },
    title:{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,

    },
    CheckboxFormX:{
        height: 80,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,

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
    }

});



