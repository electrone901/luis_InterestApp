import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { StackNavigator } from 'react-navigation';
import Firebase from "../login/Firebase";
import * as firebase from "firebase";

const mockData = [
    {
        label: 'Sports',
        value:  1
    },
    {
        label: 'Politics',
        value:  2
    },
    {
        label: 'Finance',
        value:  3
    },
    {
        label: 'Health',
        value:  4
    },
    {
        label: 'Tech',
        value:  5
    },
    //repeat
    // {
    //     label: 'Sports1',
    //     value: 'two'
    // },
    // {
    //     label: 'Politics1',
    //     value: 'three'
    // },
    // {
    //     label: 'Finance1',
    //     value: 'one'
    // },
    // {
    //     label: 'Health1',
    //     value: 'two'
    // },
    // {
    //     label: 'Tech1',
    //     value: 'one'
    // },
    // {
    //     label: 'Educat1',
    //     value: 'three'
    // },

    
    
];
 
export default class InterestsScreen extends Component {


  static navigationOptions = {
    title: 'Interest',
  };

  _onSelect = (item) => {
    
      //console.log("item CHECK:", item);
      //console.log("this.mockData.value.RNchecked:", item);
      
      // Interest1: this.mockData.value.RNchecked;
      
      let user = firebase.auth().currentUser;
      let ref =  firebase.database().ref('user');
    //   item.forEach((itemSelected) => {
    //       if(itemSelected.RNchecked == true){
    //       console.log('itemSelected:', itemSelected.label)
    //     //   if(ref.get)
    //     // //   ref.set({
    //     // //     user: user.uid,
    //     // //     interest: itemSelected,
    //     // // });
    //     //   }
    //   })
    item.forEach((itemSelected) => {
        if(itemSelected.RNchecked == true ){
         this.newArray.push(itemSelected.label)
        }
      
    }

    )
    console.log(newArray + "helllo"); 

};

  constructor(props) {
    let newArray = [];
    
    super(props);
    this.state = {
      email: "",
      password: "",
      Interest: [],
    };
    this.newArray= this.newArray.bind(this);
    // this.signup = this.signup.bind(this);
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    let user = firebase.auth().currentUser;
    if (user != null){
      var uid = user.uid;
    } 

    let ref = firebase.database().ref("users");
    // ref.set({
    //   Interest: this.state.Interest,
    // });   

    // let runThis = () => navigate('Biography');
    // runThis(); 
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

          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handlePress()}>
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



