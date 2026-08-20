import { CONFIG } from '../lib/config'

export default function Hero() {
  return (
    <section className="bg-brand-bg px-4 pb-12 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-brand-primary stroke-2"
          >
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-extrabold tracking-widest text-brand-primary">
            ROI CALCULATOR
          </span>
        </div>

        <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
          What Would You Bill If You Got {CONFIG.defaultHoursSaved} Hours
          Back?
        </h1>

        <p className="mt-3 text-lg font-semibold italic text-brand-primary sm:text-xl">
          (Without Hiring More Staff or Working 60-80 Hours Per Week)
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-gray sm:text-lg">
          Mix {CONFIG.tiers.assist.label}, {CONFIG.tiers.automate.label}, and{' '}
          {CONFIG.tiers.accelerate.label} seats to reclaim hours currently
          going to intake, drafting, and review — then see exactly what that
          time is worth below.
        </p>
      </div>
    </section>
  )
}
