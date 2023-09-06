import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    async session({ session }: any) {

    },

    async signIn({ profile }: any) {
        try {

        } catch (error) {

        }
    }
})

export { handler as GET, handler as POST } 

// every nextjs api route is a serverless route or lambda function which opens up only when her function gets called

// ervery time it is called it needs to spin up a server and make a connection to the database 

// it is good because we dont have to keep our server running constatntly
// but we have tio make a connection to tyhe database