require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker');
const app = express()
const cors = require('cors');
const reportModel = require('./userModel');
const userModel = require('./userModel');

app.use(cors({origin:"*"}))
app.use(express.urlencoded({ extended: true }))

async function connectToDB(){
    try{
        mongoose.connect('mongodb+srv://IbrahimSaffi:jmk161651@cluster0.cetgexa.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to DB")
    }
    catch(e){
     console.error("Error", err)
    }

}
async function saveDataDB(){
    for(let i=0;i<50;i++){
       let name = faker.name.fullName()
       let score = faker.datatype.number({max:100,min:1})
       let email = faker.internet.email()
       let avatar = faker.image.avatar()
       let title = faker.name.jobTitle()
       const user = new userModel({name,score,avatar,email,title})
       try{
        await user.save()
       }
       catch(e){
         console.log(e)
       }
    }
}
async function getData(){
       let users = await userModel.find({})
       if(Object.entries(users).length===0){
        await saveDataDB()
        users = await userModel.find({})
       }
  return users
}
app.get("/",async (req,res)=>{
    let users = await getData()
    res.status(200).send({users})
})
connectToDB()
app.listen(process.env.PORT || 8000)

