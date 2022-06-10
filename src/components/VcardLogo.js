import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

const VcardLogo = () => {
  
  return ( <Text style={styles.logo}>MSG-VCARD</Text> );
};

const styles = StyleSheet.create({
  logo: {
    color:'#c11e43',
    marginVertical:20,
    fontSize:36,
    fontWeight:'700',
    textShadowColor:'#000',
    letterSpacing:-1,
    textShadowColor: 'rgba(0, 0, 0, 0.10)',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10
  }
});

export default VcardLogo;