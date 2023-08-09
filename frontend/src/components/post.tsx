import React from 'react'
import Link from 'next/link'
import { PostType } from '../types/PostType';

interface PostlistProps {
  data: PostType;
}

export function Post({ data }: PostlistProps) {
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Tokyo'
  }).format(new Date(data.created_at))
  return (
    <>
      <li className='min-h-[8rem] px-8 py-4 rounded-xl' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>
        <Link href={`/post/${data.id}`} className='flex flex-col justify-between h-full'>
          <h2 className='mb-2 text-2xl text-center'>{data.title}</h2>
          <div className='flex items-center justify-between text-sm'>
            <p>{formattedDate}</p>
            <p>{data.published === 0 ? '非公開' : '公開'}</p>
          </div>
        </Link>
      </li>
    </>
  )
}
