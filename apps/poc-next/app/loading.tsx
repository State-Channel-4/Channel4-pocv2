// import Image from "next/image"

import { siteConfig } from "@/config/site"

export default function Loading() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">{siteConfig.name}</h1>
      <p>Loading...</p>
      {/* <Image
        src={
          "https://em-content.zobj.net/source/microsoft-teams/337/rocket_1f680.png"
        }
        alt="Rocket shop emoji"
        width={100}
        height={100}
      /> */}
    </main>
  )
}
