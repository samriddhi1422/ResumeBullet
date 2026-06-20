import { useState } from "react"

export default function BulletCard({ text }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group flex items-start justify-between gap-4 py-4 border-b border-neutral-100 last:border-0">

      <p className="flex-1 text-neutral-800 text-sm leading-7">
        • {text}
      </p>

      <button
        onClick={copy}
        className="text-xs text-neutral-400 hover:text-black transition-colors"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>

    </div>
  )
}