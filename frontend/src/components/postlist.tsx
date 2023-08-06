// Postlist.tsx
import React from 'react';
import { Post } from './post';
import { PostType } from '../types/PostType';

interface PostlistProps {
  data: PostType[];
}

export function Postlist({ data }: PostlistProps) {
  console.log(data);

  return (
    <ul className='grid grid-cols-4 gap-8'>
      {data.map((post) => (
        <Post key={post.id} data={post}></Post>
      ))}
    </ul>
  );
}
