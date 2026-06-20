export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">

        <h1 className="text-lg font-semibold tracking-tight text-black">
          ResumeBullet
        </h1>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-500 hover:text-black transition-colors"
        >
          Built for Digital Heroes
        </a>

      </div>
    </header>
  )
}