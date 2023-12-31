import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { DeleteBtn } from '../../src/components/deleteBtn'
import { EditBtn } from '../../src/components/editBtn'
import { PostType } from '../../src/types/PostType'

interface PostPageProps {
  data: PostType
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ params }) => {
  try {
    const { id } = params as { id: string }
    const response = await fetch(`http://localhost:5000/posts/${id}`)
    if (!response.ok) {
      return {
        notFound: true
      }
    }
    const data = await response.json()
    return {
      props: {
        data: data
      }
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      notFound: true
    }
  }
}

export default function Post({ data }: PostPageProps) {
  const [post, setPost] = useState(data)
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isSuccess, setIsSuccess] = useState('')

  const handleEdit = () => {
    if (!isEditing) {
      setTitle(data.title)
      setPublished(data.published)
    } else {
      if (!title) {
        setIsEmpty(true)
        return
      }
    }
    setTimeout(function () {
      setIsEditing(!isEditing)
    }, 100)
  }

  const handleDataRefetch = async () => {
    const response = await fetch(`http://localhost:5000/posts/${post.id}`)
    const newData = await response.json()
    setPost(newData)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditing) {
      if (title) {
        try {
          const response = await fetch(`http://localhost:5000/posts/${post.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, published })
          })
          if (response.ok) {
            setIsSuccess('success')
            setIsEmpty(false)
            setTitle('')
            setPublished(1)
            handleDataRefetch()
          } else {
            setIsSuccess('failed')
          }
        } catch (err) {
          console.error('Error posting data:', err)
        }
      } else {
        setIsEmpty(true)
      }
    }
  }

  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Tokyo'
  }).format(new Date(post.created_at))

  return (
    <div className='flex items-center justify-center h-screen'>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-2/5'>
        {!isEditing ? (
          <>
            <div className='relative mb-6 px-8 py-4 rounded-xl' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>
              <h2 className='mb-8 text-2xl text-center'>{post.title}</h2>
              {isSuccess === 'success' ? (
                <p className='mt-[-.5rem] mb-4 text-center'>記事の投稿に成功しました！</p>
              ) : isSuccess === 'failed' ? (
                <p className='mt-[-.5rem] mb-4 text-center'>記事の投稿に失敗しました！</p>
              ) : null}
              <div className='flex items-center justify-between text-sm'>
                <p>{formattedDate}</p>
                <p>{post.published === 0 ? '非公開' : '公開'}</p>
              </div>
              <EditBtn handleEdit={handleEdit} handleSubmit={handleSubmit} isEditing={isEditing}></EditBtn>
              <DeleteBtn postId={post.id}></DeleteBtn>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit} className='relative mb-6 px-8 py-4 rounded-xl' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>
              <div className='flex justify-center w-full mb-8'>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='border w-4/5 mx-auto px-2 py-1' />
              </div>
              {isEmpty === true ? (
                <p className='mt-[-.5rem] mb-4 text-center'>入力に誤りがあります！</p>
              ) : null}
              <div className='flex items-center justify-between text-sm'>
                <p>{formattedDate}</p>
                <select name="published" value={published} onChange={(e) => setPublished(parseInt(e.target.value, 10))} className='border py-1'>
                  <option value={1}>公開</option>
                  <option value={0}>非公開</option>
                </select>
              </div>
              <EditBtn handleEdit={handleEdit} handleSubmit={handleSubmit} isEditing={isEditing}></EditBtn>
              <DeleteBtn postId={post.id}></DeleteBtn>
            </form>
          </>
        )}
        <div className='w-full text-center'>
          <Link href='/' className='text-xl hover:opacity-50 duration-300'>
            - HOME -
          </Link>
        </div>
      </main>
    </div>
  )
}
