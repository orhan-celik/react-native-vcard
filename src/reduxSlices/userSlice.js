import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password : '',
  auth : false,
  loading : false,
  userInfo : {
    profile_img : 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
  },
  errors : {data:'wegwgweg'}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
        state.email = action.payload
    },
    setPassword: (state, action) => {
        state.password = action.payload
    },
    setAuth: (state, action) => {
        state.auth = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload
    },
    setUserInfo: (state, action) => {
        state.userInfo = action.payload
    },
    setErrors: (state, action) => {
        state.errors = action.payload
    }
  },
})

export const { setEmail, setAuth,setPassword, setLoading,setUserInfo,setErrors } = userSlice.actions

export default userSlice.reducer