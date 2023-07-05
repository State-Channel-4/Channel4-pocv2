"use client"

import { useSwetrix } from "@swetrix/nextjs"

export default function AnalyticWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  useSwetrix("aN8DjCSj9oaz", {
    debug: true,
  })
  return <div className="flex-1">{children}</div>
}
