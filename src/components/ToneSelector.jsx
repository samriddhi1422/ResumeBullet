'use client'

const TONES = [
  { value: 'impact-first', label: 'Impact-first' },
  { value: 'technical',    label: 'Technical'    },
  { value: 'leadership',   label: 'Leadership'   },
  { value: 'concise',      label: 'Concise'      },
  { value: 'quantified',   label: 'Quantified'   },
]

export default function ToneSelector({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TONES.map(t => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={` px-4 py-2 rounded-lg text-sm font-medium border transition-all

        ${
        selected === t.value
        ? 'bg-black text-white border-black'
        : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
        }
        `}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}