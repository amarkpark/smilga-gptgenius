import Link from "next/link"
function LandingPage() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
          Software undergoes beta testing shortly before it’s released. Beta is Latin for “still doesn’t work”. (Anonymous)
          </p>
          <Link href="/chat" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
