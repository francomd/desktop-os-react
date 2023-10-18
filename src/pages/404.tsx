import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="error-screen">
      <div className="error-screen__content">
        <img
          src="./static/img/error.png"
          alt="Illustration"
          className="error-screen__content__image"
        />
        <h1 className="error-screen__content__message">
          <strong>404</strong>
          {` `}The page doesn't exist dude. Go back to{' '}
          <Link href="/">home</Link>
        </h1>
      </div>
    </div>
  )
}
