"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import { PromptCard } from '..'

export type Post = {
  _id: string
  creator: {
    _id: string
    email: string
    username: string
    image: string
    __v: number | string
  }
  prompt: string
  tag: string
  __v: number | string

}

type PromptCardListProps = {
  data: Post[]
  handleTagClick: () => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: Post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>)

}

const Feed = () => {
  const [searchText, setsearchText] = useState("")
  const [posts, setposts] = useState<Post[]>([])
  // console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();
      // console.log(data)
      setposts(data)
    }
    fetchPosts();
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchText(e.target.value)
    
    const usernames = posts.map((post) => post.creator.username)

    if (usernames.includes(searchText)) {
      console.log('includes')
      return posts
    }
  }

 

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='search for anything (a tag or a username)'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed





