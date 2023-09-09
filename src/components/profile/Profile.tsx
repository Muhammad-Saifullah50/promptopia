import React from 'react'
import { Post } from '../feed/Feed'
import { PromptCard } from '..'

type ProfileProps = {
  name: string
  desc: string
  data: Post[]
  handleEdit: (post: Post) => void
  handleDelete: (post: Post) => void
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: ProfileProps) => {
  // console.log(data)
  return (
    <section>
      <h1 className='w-full head_text text-left'>
        <span className='blue_gradient capitalize'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-16 prompt_layout'>
        {data.map((post: Post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile