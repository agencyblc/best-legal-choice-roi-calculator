import { useEffect, useState } from 'react'

type Screenshot = {
  id: number
  src: string
  alt: string
}

const screenshots: Screenshot[] = [
  {
    id: 1,
    src: `${import.meta.env.BASE_URL}proof/screenshot-1.jpg`,
    alt: 'Client message: ranking on page one of the maps and San Diego results coming next',
  },
  {
    id: 2,
    src: `${import.meta.env.BASE_URL}proof/screenshot-2.jpg`,
    alt: 'Client message: filing 100+ cases a month and scaling to 500 cases a month',
  },
  {
    id: 3,
    src: `${import.meta.env.BASE_URL}proof/screenshot-3.jpg`,
    alt: 'Client message: three sign-ups today, on pace for five this week',
  },
]

function ScreenshotThumb({
  screenshot,
  large = false,
}: {
  screenshot: Screenshot
  large?: boolean
}) {
  return (
    <img
      src={screenshot.src}
      alt={screenshot.alt}
      className={`w-full rounded-2xl border border-gray-200 object-cover shadow-sm ${
        large ? 'max-h-[80vh] object-contain' : 'aspect-[4/3]'
      }`}
    />
  )
}

export default function ScreenshotProof() {
  const [selected, setSelected] = useState<Screenshot | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  return (
    <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          More Lawyer Successes
        </h2>

        <p
          aria-hidden="true"
          className="mt-3 text-center text-xl tracking-widest"
        >
          💎 💎 💎
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {screenshots.map((screenshot) => (
            <button
              key={screenshot.id}
              type="button"
              onClick={() => setSelected(screenshot)}
              className="text-left transition-transform hover:scale-[1.02]"
              aria-label={`Open larger view: ${screenshot.alt}`}
            >
              <ScreenshotThumb screenshot={screenshot} />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-dark shadow-md"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-brand-dark stroke-2"
              >
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
            <ScreenshotThumb screenshot={selected} large />
          </div>
        </div>
      )}
    </section>
  )
}
