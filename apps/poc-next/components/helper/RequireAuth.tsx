import { useRouter } from "next/navigation"
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
  const router = useRouter()
  if (!token || !userId) {
    router.push(siteConfig.links.signIn)
    return null
  } else {
    return children
  }
}

export default RequireAuth
