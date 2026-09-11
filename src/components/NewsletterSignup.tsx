import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire to trpc mutation when backend endpoint exists
    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <div className='bg-[#FF9500]/10 border border-[#FF9500]/30 rounded-lg p-6 text-center'>
        <p className='text-[#FF9500] font-semibold'>You're on the list.</p>
        <p className='text-white/60 text-sm mt-1'>Welcome to the community.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3'>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
        required
        className='flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF9500] transition-colors'
      />
      <button
        type='submit'
        className='bg-[#FF9500] text-[#182635] font-bold px-6 py-3 rounded-lg hover:bg-[#FF9500]/90 transition-colors whitespace-nowrap'
      >
        Join the List
      </button>
    </form>
  )
}
