"use client"
import { Profile } from '@/components'
import { Post } from '@/components/feed/Feed'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter()
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

                const filteredPosts = posts.filter((p: Post) => p._id !== post._id)
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
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