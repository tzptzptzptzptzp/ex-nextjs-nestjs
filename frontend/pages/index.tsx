import Head from 'next/head'
import { useState } from 'react'
import { Postlist } from '../src/components/postlist'
import { Form } from '../src/components/form'
import { PostType } from '../src/types/PostType'

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:5000/posts/')
    if (!response.ok) {
      console.error('Failed to fetch data:', response.statusText)
      return {
        props: {
          data: []
        }
      }
    }
    const data = await response.json()
    return {
      props: {
        data: data
      }
    }
  } catch (err) {
    console.error('Error fetching data:', err)
    return {
      props: {
        data: []
      }
    }
  }
}

interface PostlistProps {
  data: PostType[]
}

export default function Home({ data }: PostlistProps) {
  const [post, setPost] = useState(data)

  const handleDataRefetch = async () => {
    const response = await fetch('http://localhost:5000/posts/')
    const newData = await response.json()
    setPost(newData)
  }

  return (
    <div className='flex items-center justify-center'>
      <Head>
        <title>Next.js & Nest.js Blog</title>
        <meta name="description" content="Next.js & Nest.js Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-4/5'>
        <h1 className='my-8 px-8 py-4 rounded-xl text-3xl text-center' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>Next.js & Nest.js Blog</h1>
        <Form onSubmitSuccess={handleDataRefetch}></Form>
        <Postlist data={post}></Postlist>
        {post.length === 0 ? (
          <p className='text-center'>データの取得に失敗しました</p>
        ) : null}
      </main>

    </div>
  )
}
