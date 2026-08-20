// ⚠️ PLACEHOLDER VALUES — replace with real pricing before launch
export const CONFIG = {
  tiers: {
    assist: { price: 149, label: 'Assist', sublabel: 'intake & follow-up' },
    automate: {
      price: 299,
      label: 'Automate',
      sublabel: 'drafting & processing',
    },
    accelerate: {
      price: 699,
      label: 'Accelerate',
      sublabel: 'review & oversight',
    },
  },
  replacementRate: 0.75, // ⚠️ PLACEHOLDER — share of billable work offset
  defaultHourlyRate: 350, // ⚠️ PLACEHOLDER
  defaultHoursSaved: 20, // ⚠️ PLACEHOLDER
} as const

export type TierKey = keyof typeof CONFIG.tiers

// Snapshot of the placeholder values above, used only to detect whether
// CONFIG has since been edited with confirmed real-world pricing.
const PLACEHOLDER_SNAPSHOT = {
  assist: 149,
  automate: 299,
  accelerate: 699,
  replacementRate: 0.75,
  defaultHourlyRate: 350,
  defaultHoursSaved: 20,
}

export const CONFIG_HAS_UNCONFIRMED_PLACEHOLDERS = [
  CONFIG.tiers.assist.price === PLACEHOLDER_SNAPSHOT.assist,
  CONFIG.tiers.automate.price === PLACEHOLDER_SNAPSHOT.automate,
  CONFIG.tiers.accelerate.price === PLACEHOLDER_SNAPSHOT.accelerate,
  CONFIG.replacementRate === PLACEHOLDER_SNAPSHOT.replacementRate,
  CONFIG.defaultHourlyRate === PLACEHOLDER_SNAPSHOT.defaultHourlyRate,
  CONFIG.defaultHoursSaved === PLACEHOLDER_SNAPSHOT.defaultHoursSaved,
].some(Boolean)
