export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-brand-bg-alt px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <img
          src={`${import.meta.env.BASE_URL}logo.webp`}
          alt="Best Legal Choice Accelerator"
          className="mx-auto h-10 w-auto"
        />

        <p className="mt-4 text-sm text-brand-gray">
          <a href="#" className="hover:text-brand-dark">
            Terms of Service &amp; Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#" className="hover:text-brand-dark">
            Disclaimer
          </a>
        </p>

        <p className="mt-3 text-sm text-brand-gray">
          © {new Date().getFullYear()} BestLegalChoice, Inc. All Rights
          Reserved.
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-brand-gray">
          This site is not a part of the Facebook website or Facebook Inc.
          Additionally, this site is not endorsed by Facebook in any way.
          FACEBOOK is a trademark of Facebook, Inc. This site is not
          endorsed by or affiliated with Google, YouTube, or Alphabet Inc.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-brand-gray">
          Earnings Disclaimer: The results and figures referenced throughout
          this site and calculator, including client testimonials, are not
          typical and are not a guarantee of your results. Your results will
          vary based on effort, experience, case volume, staffing, market
          conditions, and other factors. We make no representation that any
          firm will achieve results similar to those stated. Any numbers
          referenced should be considered aspirational and illustrative
          only, not average or expected outcomes.
        </p>
      </div>
    </footer>
  )
}
