"use client"

import { useSwetrix } from "@swetrix/nextjs"

export default function AnalyticWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  useSwetrix(`${process.env.NEXT_PUBLIC_SWETRIX}`, {
    debug: true,
  })
  return <div className="flex-1">{children}</div>
}
