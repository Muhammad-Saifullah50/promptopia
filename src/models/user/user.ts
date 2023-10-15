import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "User already exists"],
        required: [true, "Email is required"],

    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})


const User = mongoose.models.User ||  model('User', UserSchema)

export default User

// the 'models' object provided by mongoose stores all the registered models

// if the model named User already exists in the models object, it assigns that existing model to the User variable and prevents us from redefining a model

// if a model named User does not exist in the models object, mongoose uses the model function to create  a new model  which is assogned to the user vatriable

// these serverless routes get established every single time from scratch the connection gets established