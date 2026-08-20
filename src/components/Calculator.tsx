import { useId, useMemo, useState, type CSSProperties } from 'react'
import { CONFIG, CONFIG_HAS_UNCONFIRMED_PLACEHOLDERS } from '../lib/config'
import {
  formatCurrency,
  formatCurrencySigned,
  formatMultiple,
  formatNumber,
} from '../lib/format'

type SliderFieldProps = {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

function SliderField({ label, value, min, max, onChange }: SliderFieldProps) {
  const id = useId()
  const progress = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-brand-dark">
          {label}
        </label>
        <span className="min-w-[2ch] text-right text-base font-extrabold text-brand-primary">
          {value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ '--range-progress': `${progress}%` } as CSSProperties}
      />
    </div>
  )
}

type NumberFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  min?: number
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
}: NumberFieldProps) {
  const id = useId()

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-brand-dark"
      >
        {label}
      </label>
      <div className="flex items-center rounded-md border border-gray-300 bg-white px-3 focus-within:ring-2 focus-within:ring-brand-blue">
        {prefix && (
          <span className="pr-1 text-sm font-semibold text-brand-gray">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min={min}
          value={value}
          onChange={(event) => {
            const next = Number(event.target.value)
            onChange(Number.isFinite(next) ? Math.max(min, next) : min)
          }}
          className="w-full appearance-none bg-transparent py-2.5 text-sm font-semibold text-brand-dark outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="pl-1 whitespace-nowrap text-sm font-semibold text-brand-gray">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Calculator() {
  const [assist, setAssist] = useState(2)
  const [automate, setAutomate] = useState(1)
  const [accelerate, setAccelerate] = useState(1)
  const [hourlyRate, setHourlyRate] = useState<number>(
    CONFIG.defaultHourlyRate,
  )
  const [hoursSaved, setHoursSaved] = useState<number>(
    CONFIG.defaultHoursSaved,
  )

  const results = useMemo(() => {
    const seatCost =
      assist * CONFIG.tiers.assist.price +
      automate * CONFIG.tiers.automate.price +
      accelerate * CONFIG.tiers.accelerate.price
    const totalSeats = assist + automate + accelerate
    const billableValue = totalSeats * hoursSaved * hourlyRate
    const replacedValue = billableValue * CONFIG.replacementRate
    const netMonthly = replacedValue - seatCost
    const annual = netMonthly * 12
    const roiMultiple = seatCost > 0 ? replacedValue / seatCost : 0
    const paybackDays =
      netMonthly > 0 ? Math.round((seatCost / netMonthly) * 30) : 0

    return {
      seatCost,
      totalSeats,
      billableValue,
      replacedValue,
      netMonthly,
      annual,
      roiMultiple,
      paybackDays,
    }
  }, [assist, automate, accelerate, hourlyRate, hoursSaved])

  const seatBreakdown = [
    assist > 0 ? `${assist}×$${CONFIG.tiers.assist.price}` : null,
    automate > 0 ? `${automate}×$${CONFIG.tiers.automate.price}` : null,
    accelerate > 0 ? `${accelerate}×$${CONFIG.tiers.accelerate.price}` : null,
  ].filter(Boolean)

  const replacementPercent = Math.round(CONFIG.replacementRate * 100)

  return (
    <section
      id="calculator"
      className="bg-brand-bg-alt px-4 py-16 sm:px-6 lg:px-8"
    >
      {import.meta.env.DEV && CONFIG_HAS_UNCONFIRMED_PLACEHOLDERS && (
        <div className="mx-auto mb-6 max-w-6xl rounded-md border border-yellow-400 bg-yellow-50 px-4 py-2 text-center text-xs font-bold text-yellow-800">
          ⚠️ DEV ONLY: pricing &amp; assumptions in src/lib/config.ts are
          still placeholders — confirm real values before launch.
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {/* Left: inputs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-2xl font-extrabold text-brand-dark">
            Your firm
          </h2>
          <p className="mt-1 text-sm text-brand-gray">
            Adjust seats and assumptions to model your firm's savings.
          </p>

          <div className="mt-8 space-y-7">
            <SliderField
              label={`${CONFIG.tiers.assist.label} seats (${CONFIG.tiers.assist.sublabel} — $${CONFIG.tiers.assist.price}/mo)`}
              value={assist}
              min={0}
              max={10}
              onChange={setAssist}
            />
            <SliderField
              label={`${CONFIG.tiers.automate.label} seats (${CONFIG.tiers.automate.sublabel} — $${CONFIG.tiers.automate.price}/mo)`}
              value={automate}
              min={0}
              max={10}
              onChange={setAutomate}
            />
            <SliderField
              label={`${CONFIG.tiers.accelerate.label} seats (${CONFIG.tiers.accelerate.sublabel} — $${CONFIG.tiers.accelerate.price}/mo)`}
              value={accelerate}
              min={0}
              max={10}
              onChange={setAccelerate}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                label="Your average billable rate"
                value={hourlyRate}
                onChange={setHourlyRate}
                prefix="$"
                suffix="/hour"
              />
              <NumberField
                label="Hours per seat reclaimed each month"
                value={hoursSaved}
                onChange={setHoursSaved}
                suffix="hours/seat/month"
              />
            </div>
          </div>

          <p className="mt-7 border-t border-gray-200 pt-5 text-sm text-brand-gray">
            Seat cost ={' '}
            <span className="font-bold text-brand-dark">
              {formatCurrency(results.seatCost)}/mo
            </span>
            {seatBreakdown.length > 0 && (
              <span> ({seatBreakdown.join(' + ')})</span>
            )}
          </p>
        </div>

        {/* Right: outputs */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-brand-primary p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Estimated annual savings
            </p>
            <p className="mt-2 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              {formatCurrency(results.annual)}
            </p>
            <p className="mt-1 text-sm font-semibold text-white/90">
              {formatCurrency(results.netMonthly)}/mo
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <p className="font-heading text-3xl font-extrabold text-brand-success">
                {results.seatCost > 0
                  ? formatMultiple(results.roiMultiple)
                  : '—'}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand-dark">
                ROI Multiple
              </p>
              <p className="text-xs text-brand-gray">return on investment</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <p className="font-heading text-3xl font-extrabold text-brand-success">
                {results.netMonthly > 0
                  ? formatNumber(results.paybackDays)
                  : '—'}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand-dark">
                Payback Period
              </p>
              <p className="text-xs text-brand-gray">days</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-brand-gray">
                  Billable capacity ({results.totalSeats} seats × {hoursSaved}
                  h × {formatCurrency(hourlyRate)})
                </dt>
                <dd className="whitespace-nowrap font-semibold text-brand-dark">
                  {formatCurrency(results.billableValue)}/mo
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-brand-gray">
                  Work offset by AI + automation (~{replacementPercent}%)
                </dt>
                <dd className="whitespace-nowrap font-semibold text-brand-success">
                  {formatCurrencySigned(-results.replacedValue)}/mo
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-brand-gray">Seat cost</dt>
                <dd className="whitespace-nowrap font-semibold text-brand-dark">
                  {formatCurrencySigned(results.seatCost)}/mo
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-3">
                <dt className="font-bold text-brand-dark">Net monthly gain</dt>
                <dd className="whitespace-nowrap font-extrabold text-brand-success">
                  {formatCurrency(results.netMonthly)}/mo
                </dd>
              </div>
            </dl>
          </div>

          <p className="text-xs text-brand-gray">
            Results are estimates based on the inputs you enter. Individual
            results vary.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-brand-bg-alt p-6">
            <p className="font-heading text-base font-extrabold text-brand-dark">
              What's included with every seat
            </p>
            <p className="mt-1 text-sm text-brand-dark/80">
              Done-for-you setup, pre-built workflows for your practice area,
              and live training for your team — not just software.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="w-full rounded-md bg-brand-primary px-6 py-4 text-center text-base font-extrabold text-white shadow-sm transition-colors hover:bg-brand-primary-dark"
            >
              Get FREE Training Now →
            </a>
            <p className="text-center text-xs font-bold text-brand-primary">
              VERY Limited Availability. This Training WILL NOT Be Available
              For Long!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
