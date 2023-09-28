"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
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
  handleTagClick: (tagname: string) => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: Post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>)

}

const Feed = () => {
  const [searchText, setsearchText] = useState("")
  const [posts, setposts] = useState<Post[]>([])
  const [searchResult, setsearchResults] = useState<Post[]>([])
  // console.log(posts)
  // console.log(searchText)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();
      // console.log(data)
      setposts(data)
    }
    fetchPosts();
  }, [])

  const filterPrompts = (searchText: string) => {
    const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); const regex = new RegExp(escapedSearchText, 'i') // i flag for case insensitive search


    return posts.filter((post) =>
      regex.test(post.creator?.username) ||
      regex.test(post.prompt) ||
      regex.test(post.tag)
    )
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchText(e.target.value)
    const searchResult = filterPrompts(e.target.value)

    setsearchResults(searchResult)

  }

  const handleTagClick = (tagname: string) => {
    setsearchText(tagname)
    const searchResult = filterPrompts(tagname)
    setsearchResults(searchResult)
  }
  return (
    <section className='feed flex-col'>
      <form className='relative w-full flex-center flex-col ' >
        <input
          type='text'
          placeholder='search for anything (a tag or a username)'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
        {searchText !== '' && searchResult.length === 0
          ?
          <p className='text-lg font-medium mt-10'>Oops! No results found for &apos;{searchText}&apos;</p>
          : null}
      </form>
      {searchText ? (
        <PromptCardList
          data={searchResult}
          handleTagClick={handleTagClick}
        />

      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />)}
    </section>
  )
}

export default Feed





