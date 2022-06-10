import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={'#555'} />
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        position:'absolute',
        left:0,
        top:0,
        backgroundColor:'#fff',
        opacity:1,
        width:'100%',
        height:'100%',
        textAlign:'center',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1
    }
});

export default Loading;
