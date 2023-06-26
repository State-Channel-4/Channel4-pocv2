"use client"

import Link from "next/link"
import { usePasswordStore } from "@/store/password"

import { siteConfig } from "@/config/site"

/**
 * check signin status and navigate to
 * appropriate route
 * accept same props type with Route element of react-router-dom
 */

interface Props {
  children: JSX.Element
}

const RequireAuth = ({ children }: Props) => {
  const { userId, token } = usePasswordStore()
  if (!token || !userId) {
    return (
      <div className="mx-7 my-10 flex flex-col justify-center lg:container items-center text-center">
        <h2 className="my-5">
          Sign in{" "}
          <Link href={siteConfig.links.signIn} className="text-green-500">
            here
          </Link>{" "}
          to view this section
        </h2>
      </div>
    )
  } else {
    return children
  }
}

export default RequireAuth
