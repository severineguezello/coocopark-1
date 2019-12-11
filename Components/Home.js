import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geojson from 'react-native-geojson';
import * as Permissions from 'expo-permissions'

const customData = require('../data/DEP_STA_Parkings.json');

export default class Home extends Component {
   state = {
     latitude: null,
     longitude: null
   }

   async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
   }

   render() {
    const {latitude, longitude} = this.state

     if(latitude){
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
            <Geojson geojson={customData}/>

        </MapView>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Bluetooth')}
            style={styles.bubble}
          >
            <Text style={{textAlign:'center'}}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
      );}

      return(
       <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
         <Text>En attent de la permission</Text>
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
      marginVertical: 20,
      backgroundColor: 'transparent',
      justifyContent:'center',
      alignItems:'center'
    }
  })