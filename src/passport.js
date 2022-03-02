// passport
const passport = require('passport')

// strategy local y jwt
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy

// bcrypt
const bcrypt = require('./helpers/bcrypt')

// model
const Client = require('./models/client')

// get cookies
const getCookie = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}

// Local strategy
passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
}, async (email, password, done) => {
    // Obtengo el usuario de la base de datos, si existe verifico las contraseñas y lo retorno
    const user = await Client.findOne({email})
    if(!user) return done(null,false)
    else{
        const userPassword = user.password
        const isValid = await bcrypt.MatchPassword(password,userPassword)
        if(isValid) return done(null,user)
        else return done(null,false)
    }
}));


// Jwt strategy
passport.use(new JwtStrategy({
    jwtFromRequest: getCookie,
    secretOrKey: 'test',
},async (payload,done)=> {
    await Client.findOne({'_id':[payload.sub]}).then((user, error) => {
        if(error) return done(error,false)
        if(user) return done(null,user)
        else return done(null,false)
    })
}))