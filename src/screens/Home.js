import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { useSelector,useDispatch } from 'react-redux';
import { setUserInfo } from '../reduxSlices/userSlice';
import axios from 'axios';

import Logo from './../components/Logo'

const Home = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch()

  let userInfo = useSelector((state) => state.user.userInfo);

  //console.log(userInfo);

  const handleLogin = async () => {
    await dispatch(setUserInfo({}))
    navigation.navigate('Login')
  }

  useEffect(() => {
    handleUserInfo();
  },[]);

  const handleUserInfo = async() => {
    if(!userInfo.token) handleLogin();

    axios.post(`${process.env.API_URL}qr-code`, userInfo,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    })
    .then(async (response) => {
      const data = await response.data;
      if(data.result != 'success') handleLogin();
      await dispatch(setUserInfo({...userInfo,...data.data}));
      //console.warn('Bilgi : ',{...userInfo,...data.data});
    }).catch(async (error) => {
      //console.error('Hata var',error);
      handleLogin();
    })

  }

  return (
    <ImageBackground
      source={require('../images/ScreenBg.jpg')}
      style={styles.container}>
      <View style={styles.header}>
        { userInfo?.comp?.logo && <Logo logoInfo={userInfo?.comp?.logo} /> }
        <TouchableOpacity onPress={handleLogin}>
          <AntDesign name="poweroff" size={28} color="#c11e43" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.contentUser}>
          {
            userInfo?.profile_img ? <Image
            style={styles.avatar}
            source={{
              uri: userInfo.profile_img
            }}
          /> : <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={100} height={100} borderRadius={100} />
        </SkeletonPlaceholder>
          }
          
          <View>
            <Text style={styles.contentUserName}><AntDesign name="user" size={24} color="#333" /> {userInfo.full_name}</Text>
            <Text style={styles.contentUserName}><AntDesign name="mobile1" size={24} color="#333" /> {userInfo.phone}</Text>
            <Text style={styles.contentUserName}><AntDesign name="mail" size={24} color="#333" /> {userInfo.email}</Text>
            </View>
        </View>
        <View>
        
        {
          userInfo?.qr_code 
          ? <Image style={styles.qr_code} source={{uri: userInfo.qr_code}} /> 
          : 
          <SkeletonPlaceholder>
            <View style={{ width: Math.floor(Dimensions.get('window').width) - 70, height: Math.floor(Dimensions.get('window').width) - 70, flexDirection: "row", alignItems: "center" }} />
          </SkeletonPlaceholder>
        }
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  content: {flex: 9, 
    justifyContent: 'center', 
    alignItems: 'center',
},
  contentUser: {
    flexDirection: 'column',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'red',
    position:'relative',
    paddingLeft:50,
    paddingTop:20
  },
  contentUserHi: {fontSize: 18, fontStyle: 'italic'},
  contentUserName: {fontSize: 16,marginVertical:3},
  avatar: {
    position:'absolute',
    left:'-10%',
    top:'-60%',
    marginBottom: 15,
    width: 100,
    height: 100,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  qr_code: {
    width: Math.floor(Dimensions.get('window').width) - 70,
    height: Math.floor(Dimensions.get('window').width) - 70,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginTop:50,
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  userText : {
    marginBottom:15
  }
});

export default Home;
