import { useState } from 'react'
import Header from './components/Header'
import ToneSelector from './components/ToneSelector'
import BulletCard from './components/BulletCard'

const inputClass = ` w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900
placeholder-neutral-400  outline-none focus:border-black transition-all`

export default function App() {
  const [role, setRole]               = useState('')
  const [company, setCompany]         = useState('')
  const [description, setDescription] = useState('')
  const [target, setTarget]           = useState('')
  const [count, setCount]             = useState('4')
  const [tone, setTone]               = useState('impact-first')
  const [bullets, setBullets]         = useState([])
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')

  async function generate() {
    if (!description.trim()) {
      setError('Please describe what you did.')
      return
    }
    setError('')
    setLoading(true)
    setBullets([])

    try {
      const res = await fetch('http://localhost:5000/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    role,
    company,
    description,
    target,
    count,
    tone,
  }),
})

const data = await res.json()

if (!res.ok) {
  throw new Error(data.error || 'Request failed')
}

setBullets(data.bullets)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function copyAll() {
    navigator.clipboard.writeText(bullets.map(b => '• ' + b).join('\n'))
  }

  return (
<div className="min-h-screen bg-white">
        <Header />

      <main className="max-w-3xl mx-auto px-5 py-14 pb-24">

        {/* Hero */}
<div className="text-center mb-16">
  <h1 className="text-5xl font-semibold tracking-tight text-black mb-4">
    Write stronger resume bullets
  </h1>

  <p className="text-neutral-500 max-w-xl mx-auto text-base leading-relaxed">
    Transform rough work descriptions into concise,
    impact-focused achievements recruiters actually read.
  </p>
</div>

        {/* Input card */}
        <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2.5">
<div className="w-2 h-2 rounded-full bg-black" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Your Experience
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Job Title / Role
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. Full Stack Dev Intern"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Company / Project
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. EasyWash, JalMitra"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                What did you actually do?{' '}
                <span className="text-gray-600 normal-case font-normal">be specific</span>
              </label>
              <textarea
                className={`${inputClass} min-h-[100px] resize-y`}
                placeholder="e.g. Built a booking system for car and home cleaning using React and Node.js. Added real-time slot availability, fixed a bug where dates reset on page refresh, improved mobile layout. Deployed on Vercel."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Target Role
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. SDE Intern, APM"
                  value={target}
                  onChange={e => setTarget(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Number of Bullets
                </label>
                <select
                  className={inputClass}
                  value={count}
                  onChange={e => setCount(e.target.value)}
                >
                  {['3', '4', '5', '6'].map(n => (
                    <option key={n} value={n} className="bg-gray-900">{n} bullets</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                Tone
              </label>
              <ToneSelector selected={tone} onChange={setTone} />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              onClick={generate}
              disabled={loading}
             className=" w-full bg-black hover:opacity-90 text-white font-medium py-3.5 rounded-xl transition-all "
            >
              {loading ? 'Generating...' : 'Generate Bullet Points →'}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center mb-5">
            <div className="w-8 h-8 border-2 border-gray-700 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4" />
<p className="text-sm text-neutral-500"> Generating bullet points...</p>  
          
          </div>
        )}

        {/* Output */}
        {bullets.length > 0 && (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden mb-8">

    {/* Header */}
    <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-black">
          Generated Bullets
        </span>

        <span className="px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
          {bullets.length}
        </span>
      </div>

      <button
        onClick={copyAll}
        className="  px-3 py-1.5 text-sm font-medium text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:text-black transition-all "
      >
        Copy all
      </button>

    </div>

    {/* Bullets */}
    <div className="p-6">
      <div className="space-y-1">
        {bullets.map((b, i) => (
          <BulletCard key={i} text={b} />
        ))}
      </div>
    </div>

  </div>
)}

      {/* Tips */}
<div className="mt-12">
  <h3 className="text-sm font-semibold text-black mb-4">
    Writing better bullets
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    {[
      {
        title: 'Add numbers',
        body: 'Include metrics such as users, performance improvements, revenue impact, or team size whenever possible.',
      },
      {
        title: 'Lead with action',
        body: 'Start each bullet with strong verbs like Built, Designed, Optimized, Implemented, or Led.',
      },
      {
        title: 'Match the role',
        body: 'Align your language with the job description to improve ATS visibility and recruiter relevance.',
      },
    ].map((tip) => (
      <div
        key={tip.title}
        className="p-5 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition-colors"
      >
        <h4 className="text-sm font-semibold text-black mb-2">
          {tip.title}
        </h4>

        <p className="text-sm text-neutral-500 leading-relaxed">
          {tip.body}
        </p>
      </div>
    ))}

  </div>
</div>

        {/* Footer */}
      <footer className="mt-20 py-8 border-t border-neutral-200">
  <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-2">

    <p className="text-sm text-neutral-500">
      Built by <span className="font-medium text-black">Samriddhi Shrivastava</span>
    </p>

    <a
      href="mailto:samriddhidubey2005@gmail.com"
      className="text-sm text-neutral-500 hover:text-black transition-colors"
    >
      samriddhi1422@gmail.com
    </a>

    <a
      href="https://digitalheroesco.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-neutral-500 hover:text-black transition-colors"
    >
      Built for Digital Heroes
    </a>

  </div>
</footer>
      </main>
    </div>
  )
}