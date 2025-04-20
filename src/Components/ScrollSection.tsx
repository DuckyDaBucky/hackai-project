import { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  backgroundColor?: string
  children: ReactNode
}

export default function ScrollSection({
  id,
  title,
  backgroundColor = 'bg-white',
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`snap-start ${backgroundColor} w-full min-h-screen flex flex-col items-center justify-center px-4 py-16`}
    >
      <h2 className="text-4xl font-bold mb-10 text-center">{title}</h2>
      {children}
    </section>
  )
}
