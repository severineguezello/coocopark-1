import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, Alert} from 'react-native';
import Slider from 'react-native-slide-to-unlock';
import {Icon} from 'native-base';


export default class Welcome extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <View style={styles.container}>
                <Text style={{fontSize:40, textAlign:'center', color:'#0264B2'}}>Bienvenue sur</Text>
            <View style={styles.img}>
                <Image
                    source={require('../media/logofb.png')}
                    style = {{width : 350, height : 200}}
                />
            </View>
            <Slider
                childrenContainer={{ backgroundColor: 'white' }}
                onEndReached={() => this.props.navigation.navigate('Home')}
                containerStyle={{
                    margin: 8,
                    width:250,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderColor:'#0264B2',
                    borderWidth:2,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                sliderElement={
                    <Icon
                      name="car"
                      color="#0264B2"
                      style={{marginLeft:10, marginRight:10}}
                    />
                  }
                >
                <Text style={{color:'grey'}}>{'GLISSER POUR OUVRIR'}</Text>
                </Slider>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex : 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    img : {
        justifyContent:'center',
        alignItems:'center'
    }
   });
   