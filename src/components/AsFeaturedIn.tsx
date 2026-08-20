const publications = ['ABA', 'TECHSHOW', 'LawSites']

export default function AsFeaturedIn() {
  return (
    <section className="bg-brand-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray">
          As Featured In
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          {publications.map((name) => (
            <span
              key={name}
              className="font-heading text-2xl font-extrabold tracking-wide text-gray-400 grayscale"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
