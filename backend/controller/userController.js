
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require("../model/userModel")



// @desc Register new user
// @route  post/api/users
// @access Public

const registerUser =asyncHandler(async(req, res)=>{
    const {name,email,password,userName} = req.body
    if(!name || !email || !password || !userName){
        res.status(400)
        throw new Error('please add all fields')
    }
    
    // check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // create user
    const user = await User.create({
        name,email,password:hashedPassword,userName
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            userName: user.userName,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user credentials")
    }
})

// @desc Authentic a user
// @route  pos/api/login
// @access Public
const LoginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            userName: user.userName,
            token:generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error("Invalid user credentials")
    }
}
)
// @desc get user data
// @route  Get/api/users/me
// @access private

const getMe =asyncHandler(async(req, res)=>{

   const {_id, name, email} = await User.findById(req.user.id)
   res.status(200).json({
    id: _id,
    name,
    email,
   })
}
)
// generate a jwt
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d',
    })

}


module.exports = {
    registerUser,
    LoginUser,
    getMe
}