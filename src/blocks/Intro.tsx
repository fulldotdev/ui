import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Intro({ children }: Props) {
  return (
    <section className="intro intro-1 py-0">
      <div>
        <div className="border-b py-12">
          <div>
            <h1>Hello world</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
