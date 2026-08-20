import type { ReactNode } from 'react'

type Testimonial = {
  quote: ReactNode
  name: string
  practiceArea: string
}

const highlight = (text: string) => (
  <span className="underline decoration-brand-primary decoration-2 underline-offset-2">
    {text}
  </span>
)

const testimonials: Testimonial[] = [
  {
    quote: (
      <>
        "We'll hit {highlight('$1,000,000')} by end of the month and about{' '}
        {highlight('$1.2M')} by end of the year!"
      </>
    ),
    name: 'Michael Klitzke, Esq.',
    practiceArea: 'Auto Fraud & Lemon Law Attorney',
  },
  {
    quote: <>"We had {highlight('our biggest month ever')}!"</>,
    name: 'Jacob Denson, Esq.',
    practiceArea: 'DWI & Accident Attorney',
  },
  {
    quote: (
      <>
        "{highlight('$789,000')} in the last 12 months! All this is because
        of you James and your program! Major thanks!!"
      </>
    ),
    name: 'Seth C. Bowen, Esq.',
    practiceArea: 'Divorce Attorney',
  },
  {
    quote: (
      <>
        "Safe to say we can process {highlight('500+ cases a month')} since
        scalable!"
      </>
    ),
    name: 'Lennie Alzate, Esq. & John Varley, Esq.',
    practiceArea: 'Bankruptcy Attorneys',
  },
  {
    quote: <>"{highlight('$47,161 in 8 days')}!"</>,
    name: 'Garrison "Bud" Klueck, Esq.',
    practiceArea: 'Family Law San Diego',
  },
  {
    quote: (
      <>
        "It's bringing in {highlight('the most leads')} out of any other
        source we're using right now!"
      </>
    ),
    name: 'Harmony Alves, Esq.',
    practiceArea: 'Accident Attorney',
  },
  {
    quote: (
      <>
        "There is {highlight('no other lead generation system')} that comes
        close as far as its value!"
      </>
    ),
    name: 'Tera Lee, Esq.',
    practiceArea: 'Family Attorney',
  },
  {
    quote: (
      <>
        "{highlight('5084% ROI')}! The best ROI and superior client leads!"
      </>
    ),
    name: 'Mehran Fardis, Esq.',
    practiceArea: 'Immigration Attorney',
  },
  {
    quote: (
      <>
        "{highlight('743% growth in one year')}! This is a GOLDMINE for ANY
        law firm! What are you waiting for? JOIN NOW!!"
      </>
    ),
    name: 'Martin Mendoza, Esq.',
    practiceArea: 'Civil Attorney',
  },
]

function Star() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 fill-brand-gold"
    >
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3-5.4 3 1.3-6-4.6-4.2 6.1-.6z" />
    </svg>
  )
}

function TestimonialCard({ quote, name, practiceArea }: Testimonial) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <p className="font-heading text-lg font-extrabold leading-snug text-brand-dark">
          {quote}
        </p>

        <p className="mt-4 font-bold text-brand-dark">{name}</p>
        <p className="text-sm text-brand-gray">{practiceArea}</p>

        <p className="mt-4 text-sm font-bold text-brand-blue">
          Rated 5 out of 5 Stars
        </p>
        <div className="mt-1 flex items-center gap-1">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
    </div>
  )
}

export default function SuccessStories() {
  return (
    <section className="bg-brand-bg-alt px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          Lawyer Success Stories
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
