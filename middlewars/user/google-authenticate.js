import {nanoid} from 'nanoid';
import { Strategy } from 'passport-google-oauth2';
import passport from 'passport';
import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../../models/user.js'
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://task-pro-group-1-backend.onrender.com/users/google/callback",
    passReqToCallback: true
}

const googleCallback = async (req, accessToken, refreshToken, profile, done) => {
    try {
        const { email, displayName } = profile;
        const user = await User.findOne({ email });
        console.log(user)
        if (user) {
            return done(null, user);
        }
        const password = await bcrypt.hash(nanoid(), 10);

        const newUser = await User.create({ email, password, name: displayName });
        done(null, newUser);

    }
    catch (error) {
        done(error, false); 
    }
}

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy)

export default passport;
