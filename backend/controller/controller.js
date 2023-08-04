const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalsModel')
const User = require("../model/userModel")

// @desc get goals
// @route Get/api/goals
// @access private
const getGoals =asyncHandler (async(req, res)=>{
    const goals = await Goal.find({user:req.user.id})
  
    res.status(200).json(goals)
})

// @desc set goals
// @route Post/api/goals
// @access private
const setGoals =asyncHandler( async(req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        Text: req.body.text,
        User:req.user.id
    })


    res.status(200).json(goal)
})
// @desc update goals
// @route put/api/goals/:id
// @access private
const updateGoals =asyncHandler(async(req, res)=>{

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }
    const user = await User.findById(red.user.id)
    // check for user
    if(!user){

        res.status(401)
        throw new Error("user not found")
    }
    // make sure the logged in user matches goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("user not authorized")

    }


    const updateGoal = await Goal.findById(req.params.id,
        req.body, {
            new: true
        })
    res.status(200).json(updateGoal)
    
})
// @desc delete goals
// @route delete/api/goals/:id
// @access private
const deleteGoals =asyncHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }
    const user = await User.findById(red.user.id)
    // check for user
    if(!user){

        res.status(401)
        throw new Error("user not found")
    }
    // make sure the logged in user matches goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("user not authorized")

    }
    await goal.deleteOne()

    res.status(200).json({id: req.params.id})
}
)
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}