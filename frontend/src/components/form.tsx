import React, { useState } from 'react'

export function Form() {
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(1)
  const [isSuccess, setIsSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, published })
      })
      if (response.ok) {
        setIsSuccess('success')
      } else {
        setIsSuccess('failed')
      }
    } catch (err) {
      console.error('Error posting data:', err)
    }
  }
  return (
    <div className='flex flex-col gap-4 mb-8 px-8 py-4 rounded-xl' style={{ boxShadow: '0px 5px 15px -5px #b0b0b0' }}>
      <form onSubmit={handleSubmit} className='flex justify-center gap-4 w-full'>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className='border w-2/5 px-2 py-1' />
        <select name="published" value={published} onChange={(e) => setPublished(parseInt(e.target.value, 10))} className='border py-1'>
          <option value={1}>公開</option>
          <option value={0}>非公開</option>
        </select>
        <button type="submit" className='px-4 py-1 border'>投稿</button>
      </form>
      {isSuccess === 'success' ? (
        <p className='text-center'>記事の投稿に成功しました！</p>
      ) : isSuccess === 'failed' ? (
        <p className='text-center'>記事の投稿に失敗しました！</p>
      ) : null}
    </div>
  )
}