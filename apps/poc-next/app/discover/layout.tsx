import { BottomNavigation } from "@/components/bottom-nav"

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <div className="block md:hidden">
        <BottomNavigation />
      </div>
    </>
  )
}
