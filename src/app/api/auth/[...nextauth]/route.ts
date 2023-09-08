import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@/utils/database";
import User from "@/models/user/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session }: any) {

            const sessionUser = await User.findOne({
                email: session.user.email
            })
            if (sessionUser) {
                session.user.id = sessionUser._id.toString();

            }

            return session
        },

        async signIn({ profile }: any) {
            try {
                await connectToDB()

                // checking if user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                // if not create new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }

// every nextjs api route is a serverless route or lambda function which opens up only when her function gets called

// ervery time it is called it needs to spin up a server and make a connection to the database 

// it is good because we dont have to keep our server running constatntly
// but we have tio make a connection to tyhe database