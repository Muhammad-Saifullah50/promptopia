import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@/utils/database";
import User from "@/models/user/user";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: 'promptopia',
                exp: Math.floor(Date.now() / 1000) + 60 * 60 // 13h
            }, secret)
            // console.log(encodedToken, "encodedToken")
            return encodedToken
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
            // console.log(decodedToken, "decodedToken")
            return decodedToken
        }
    },
    callbacks: {
        async session({ session }: any) {

            const sessionUser = await User.findOne({
                email: session?.user?.email
            })
            if (sessionUser) {
                session.user.id = sessionUser?._id.toString();

            }

            return session
        },

        async signIn({ profile }: any) {
            'use server'
            try {
                await connectToDB()

                // checking if user already exists
                const userExists = await User.findOne({
                    email: profile?.email
                })
                // if not create new user
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
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