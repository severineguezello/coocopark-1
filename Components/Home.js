import React, { Component, useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geojson from 'react-native-geojson';
import * as Permissions from 'expo-permissions'

const customData = require('../data/DEP_STA_Parkings.json');

const busyColor = 'red';
const availableColor = 'green';

export default class Home extends Component {

   state = {
     latitude: null,
     longitude: null,
     instantData: [],
     loading_parking: true,
     etats: [],
     loading_etats: true
   }

   async componentDidMount() {
     this.setState({
      loading_etats: true,
      loading_parking: true
     });

    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    );

    fetch("http://172.20.10.13:8000/article/1", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJSON)=>{
        this.setState({
          loading_parking: false,
          instantData: responseJSON,
        })
        //console.log(this.state.instantData)
      })
      .catch((error) => {
        console.error(error)
        console.log('ERREUR : ' + error.message)
      });

    fetch("http://172.20.10.13:8000/article/2", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJSON)=>{
        this.setState({
          loading_etats: false,
          etats: responseJSON,
        })
        //console.log(this.state.instantData)
      })
      .catch((error) => {
        console.error(error)
        console.log('ERREUR : ' + error.message)
      });
    }

    statesRefresh(id){
      fetch("http://172.20.10.13:8000/article/2", {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJSON)=>{
          this.setState({
            loading_etats: false,
            etats: responseJSON,
          })
          //console.log(this.state.instantData)
        })
        .catch((error) => {
          console.error(error)
          console.log('ERREUR : ' + error.message)
        });
        return(this.stateColor(id))
      }




   stateColor(id){
    if (id==1){
      if(this.state.etats[0]['etat_1']=='0'){
        return availableColor;
      }else{return busyColor;}
    }
    if (id==2){
      if(this.state.etats[1]['etat_2']=='0'){
        return availableColor;
      }else{return busyColor;}
    }
    if (id==3){
      if(this.state.etats[2]['etat_3']=='0'){
        return availableColor;
      }else{return busyColor;}
    }
   }

   render() {
    const {latitude, longitude} = this.state

     if(latitude && this.state.loading_parking==false && this.state.loading_etats==false){
      return (
        <View style={styles.container}>
        <MapView
         showsUserLocation
         style={{flex:1}}
         initialRegion={{
           latitude,
           longitude,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421
         }}
        >
            <Geojson geojson={customData}
            data={this.state.instantData}/>

            <Marker
              key={1}
              coordinate={{latitude:48.356919,
                          longitude:-4.568167,}}
              pinColor={this.statesRefresh(1)}
              />

            <Marker
              key={2}
              coordinate={{latitude:48.357329,  
                          longitude: -4.568419,}}
              pinColor={this.stateColor(2)}
              />

            <Marker
              key={3}
              coordinate={{latitude:48.357780, 
                          longitude: -4.568707,}}
              pinColor={this.stateColor(3)}
              />

            </MapView>
      </View>
      );}

      return(
       <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
         <Text>En attent de la permission</Text>
         <ActivityIndicator/>
       </View>
       
     );
    }
}

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    bubble: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: '#00000000',
      justifyContent:'center',
      alignItems:'center'
    }
  })





/*   fetch('https://mywebsite.com/endpoint/', 
  { method: 'POST', 
  headers: { 
    Accept: 'application/json', 'Content-Type': 'application/json', }, 
  body: JSON.stringify({ firstParam: 'yourValue', secondParam: 'yourOtherValue', }), })
  .then((response) => response.json()) 
  .then((responseJson) => { return responseJson.movies; }) 
  .catch((error) => { console.error(error); });
 */