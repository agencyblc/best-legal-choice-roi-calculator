export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-brand-bg/95 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <a href="#top">
          <img
            src={`${import.meta.env.BASE_URL}logo.webp`}
            alt="Best Legal Choice Accelerator"
            className="h-10 w-auto sm:h-12"
          />
        </a>
      </div>
    </header>
  )
}
