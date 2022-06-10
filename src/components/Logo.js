import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

const Logo = ({logoInfo}) => {
  
  return (
    <Image
        style={{width: logoInfo.width, height: logoInfo.height}}
        source={{ uri : logoInfo.uri }}
      />
  );
};

const styles = StyleSheet.create({});

export default Logo;