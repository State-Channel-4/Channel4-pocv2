"use client"

import Link from "next/link"
import { usePasswordStore } from "@/store/password"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"

import { SecondaryNav } from "./secondary-nav"

export function SiteHeader() {
  const { password, token, userId, updatePassword, updateToken, updateUserId } =
    usePasswordStore()

  const onLogOutClickHandler = () => {
    updatePassword(null)
    updateToken(null)
    updateUserId(null)
  }

  return (
    <header className="bg-background w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.discord className="h-5 w-5 fill-current" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
            {/* <ThemeToggle /> */}
            {!(password && userId && token) ? (
              <SecondaryNav items={siteConfig.secondaryNav} />
            ) : (
              <Button variant="ghost" onClick={onLogOutClickHandler}>
                <Icons.logout className="h-5 w-5" />
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
