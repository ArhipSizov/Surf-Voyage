import { configureStore} from '@reduxjs/toolkit'

import reducerUser from './SliceUser'
import reducerRests from './SliceRests';
import firebaseConfig from "../../../firebaseConfig";
import firebase from "firebase/compat/app";

import "firebase/compat/database";

export const database = firebase.initializeApp(firebaseConfig).database();

export default configureStore({
    reducer: {
        user: reducerUser,
        rests: reducerRests
    }
})