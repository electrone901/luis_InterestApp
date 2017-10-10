import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Firebase from "../login/Firebase";
import * as firebase from "firebase";

class UselessTextInput extends Component {
   constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
  }

  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props & passed to it up
        editable = {true}
        maxLength = {250}
      />
    );
  }
}
 
export default class BiographyScreen extends Component {
  
  static navigationOptions = {
    title: 'Biography',
  };

  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    let user = firebase.auth().currentUser;
    if (user != null){
      var uid = user.uid;
    }

    let ref = firebase.database().ref(uid);
    //writes data to Firebase
    ref.set({
      bio: this.state.text
    });   
  }


  _onSelect = ( item ) => {
      console.log(item);
  };



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
                 placeholder="I love hiking!"
                 onChangeText={(text) => this.setState({text})}
                 value={this.state.text}
               />
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handlePress()} >
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
});



