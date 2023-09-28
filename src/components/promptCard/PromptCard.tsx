"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Post } from '../feed/Feed'

type PromptCardProps = {
  post: Post
  handleTagClick?: (tagname: string) => void
  handleEdit?: () => void
  handleDelete?: () => void
}

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }: PromptCardProps) => {

  const { data: session } = useSession()
  const router = useRouter()
  const pathName = usePathname();
  const [copied, setCopied] = useState('')
  const userId = (session?.user as { id: string })?.id
  
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)  //copies to clipboard

    setTimeout(() => { setCopied('') }, 10000);
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator?.image}
            alt='image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col '>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={20}
            height={20}
            alt='copy'
          />
        </div>
      </div>

      <p className='text-sm my-4 font-satoshi text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {userId === post.creator._id && pathName === `/profile/${userId}` && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-200 pt-3'>
          <button className='font-inter text-sm green_gradient cursor-pointer '
            onClick={handleEdit}>
            Edit
          </button>
          <button className='font-inter text-sm orange_gradient cursor-pointer ' onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default PromptCard