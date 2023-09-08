import mongoose, { ConnectOptions } from 'mongoose'

let isConnected = false // track the database connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("mongodb is connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'promptopia',
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions)

        isConnected = true
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}