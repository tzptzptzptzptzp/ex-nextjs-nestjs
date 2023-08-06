import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { PostType } from '../../src/types/PostType'

interface PostPageProps {
  data: PostType
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ params }) => {
  const { id } = params as { id: string }
  const response = await fetch(`http://localhost:5000/posts/${id}`)
  const data = await response.json()
  return {
    props: {
      data: data
    }
  }
}

export default function Post({ data }: PostPageProps) {
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Tokyo'
  }).format(new Date(data.created_at))
  return (
    <div className='flex items-center justify-center h-screen'>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-2/5'>
        <div className='mb-6 px-8 py-4 rounded-xl' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>
          <h2 className='mb-8 text-2xl text-center'>{data.title}</h2>
          <div className='flex items-center justify-between text-sm'>
            <p>{formattedDate}</p>
            <p>{data.published === 0 ? '非公開' : '公開'}</p>
          </div>
        </div>
        <div className='w-full text-center'>
          <Link href='/' className='text-xl hover:opacity-50 duration-300'>
            - HOME -
          </Link>
        </div>
      </main>
    </div>
  )
}
