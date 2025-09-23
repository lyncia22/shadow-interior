import { useState } from 'react'
import { z } from 'zod'

const Schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Please provide more details (min 10 chars)')
})

type FormData = z.infer<typeof Schema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as any as FormData

    const parsed = Schema.safeParse(data)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid form')
      return
    }

    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <div className="form-row">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell us about your project" rows={6} required />
      </div>
      <div className="form-actions">
        <button className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'sent' && <span style={{ color: 'var(--navy)' }}>Thanks! We'll get back to you soon.</span>}
        {error && <span style={{ color: 'crimson' }}>{error}</span>}
      </div>
    </form>
  )
}
