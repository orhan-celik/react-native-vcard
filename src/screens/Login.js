import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useSelector,useDispatch } from 'react-redux';
import { setEmail, setLoading, setPassword,setUserInfo, setErrors } from '../reduxSlices/userSlice';
import axios from 'axios';

import Loading from './../components/Loading'
import VcardLogo from './../components/VcardLogo'

const Login = ({ navigation }) => {

  const dispatch = useDispatch()

  const email = useSelector((state) => state.user.email)
  const password = useSelector((state) => state.user.password)
  const loading= useSelector((state) => state.user.loading)
  const errors= useSelector((state) => state.user.errors)

  const handleLogin = async() => {


    dispatch(setErrors({}));
    //dispatch(setLoading(true));
    
    axios.post(`${process.env.API_URL}login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(async (response) => {
        const user = await response.data;
        if(user.result != 'success'){
          throw(JSON.stringify(user.error));
          return;
        }
        //console.log(user);
        await dispatch(setUserInfo(user.data));
        await dispatch(setLoading(false));
        navigation.navigate('Profile')
      })
      .catch(async (error) => {
        const err = await JSON.parse(error);
        dispatch(setErrors(err));
        dispatch(setLoading(false));
        if(!err.hasOwnProperty('valid')){
          Alert.alert(err.title,err.message,[
            { text: err.buttonText }
          ]);
        }
        //console.log(err);
      })
  }

  return (
    <ImageBackground
      source={require('../images/bg.png')}
      style={styles.backgroundImage}>
        {loading && <Loading />}
      <View style={styles.container}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="qrcode-scan" size={40} color="#30419b" />
        </View>
        <VcardLogo />
        <TextInput
          value={email}
          placeholder={'E-Mail Adresiniz :'}
          style={styles.input}
          onChangeText={(email) => dispatch(setEmail(email))}
          maxLength={50}
        />
        {errors?.valid?.email && (
          <View style={styles.error}>
            <Feather name="alert-triangle" size={16} color="#c11e43" />
            <Text style={styles.errorText}>{errors.valid.email}</Text>
          </View>
        )}
        <TextInput
          value={password}
          placeholder={'Şifre :'}
          style={styles.input}
          onChangeText={(password) => dispatch(setPassword(password))}
          secureTextEntry={true}
          password={true}
          maxLength={20}
        />
        {errors?.valid?.password && (
          <View style={styles.error}>
            <Feather name="alert-triangle" size={16} color="#c11e43" />
            <Text style={styles.errorText}>{errors.valid.password}</Text>
          </View>
        )}
        <View style={{flexDirection:'row',marginVertical:15}}>
        <Fontisto name="locked" size={18} color="#999" style={{marginRight:10}} />
        <Text>E-Posta adresiniz ve bilgisayar açma şifreniz ile giriş
          yapabilirsiniz.</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <Text style={{color: '#fff'}}>GİRİŞ</Text>
          <AntDesign name="arrowright" size={28} color="#fff" style={{marginLeft:10}} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 7,
    paddingHorizontal: 30,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    position:'relative'
  },
  icon : {
    position: 'absolute',
    width:80,
    height:80,
    borderRadius:80,
    backgroundColor:'#fff',
    top:-40,
    left:'45%',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    borderRadius: 3,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#30419b',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    color: '#fff',
    borderRadius: 30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  description: {
    color: '#777',
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 10,
  },
  error: {
    width:'100%',
    paddingHorizontal:5,
    marginBottom:10,
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row'
  },
  errorText: {
    color: '#c11e43',
    marginLeft:5
  }
});

export default Login;