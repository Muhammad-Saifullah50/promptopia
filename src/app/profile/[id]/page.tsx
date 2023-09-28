"use client"
import { Profile } from '@/components'
import { Post } from '@/components/feed/Feed'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'


const ProfilePage = async () => {

    const { data: session } =useSession();
    const router = useRouter()

    const [posts, setPosts] = useState([])
    const userId = (session?.user as { id: string })?.id


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


    const handleEdit = (post: Post) => {
        router.push(`/update-prompt?id=${post?._id}`)
    }

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm("Are you sute you want to delete this prompt?")

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post?._id.toString()}`,
                    {
                        method: 'DELETE'
                    })

                const filteredPosts = posts.filter((p: Post) => p?._id !== post?._id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (

        <Profile
            name={(session?.user as { name: string })?.name || ''}
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage