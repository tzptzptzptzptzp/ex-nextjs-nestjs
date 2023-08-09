import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function DeletePost() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Head>
        <title>投稿を削除しました</title>
        <meta name="description" content='投稿を削除しました' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-2/5'>
        <div className='relative mb-6 px-8 py-10 rounded-xl' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>
          <h2 className='text-2xl text-center'>投稿を削除しました</h2>
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
