import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  color: string
}

const Notification = ({ children, color }: Props) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 7000) // 7 seconds
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {show ? (
        <div
          className="fixed right-5 top-5 min-w-max rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{children}</span>
          <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
            <svg
              className="h-6 w-6 fill-current text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setShow(false)}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}
    </>
  )
}

export default Notification
