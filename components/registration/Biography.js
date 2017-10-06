import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { StackNavigator } from 'react-navigation';

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
      />
    );
  }
}
 
export default class BiographyScreen extends Component {
  static navigationOptions = {
    title: 'Biography',
  };

  _onSelect = ( item ) => {
      console.log(item);
    };

    constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.signup = this.signup.bind(this);
  }

  // use this to make an ajax call to save input to db
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

    render() {
      const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Tell us about yourself</Text>
            

            <View style={{
               backgroundColor: '#ccf0f9',
               borderColor: '#000000',
               borderWidth: 1,
               height: 80,
               borderBottomWidth: 1 }}
             >
               <UselessTextInput
                 multiline = {true}
                 numberOfLines = {4}
                 onChangeText={(text) => this.setState({text})}
                 value={this.state.text}
               />
             </View>

             <TouchableOpacity style={styles.buttonContainer}  onPress={() => navigate('Interest')}>
                <Text  style={styles.buttonText}>NEXT</Text>
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
        height: 180,
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



