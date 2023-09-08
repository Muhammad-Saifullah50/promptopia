"use client"
import { Profile } from '@/components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const MyProfile = () => {
    const { data: session } = useSession();
    const userId = (session?.user as { id: string })?.id

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)

            const data = await response.json();
            // console.log(data)
            setPosts(data)
            // console.log(posts)
        }
       if (userId) fetchPosts();
    }, [userId])


    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }
    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile