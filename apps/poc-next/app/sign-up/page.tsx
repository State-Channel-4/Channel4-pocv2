import Image from "next/image"

import { Button } from "@/components/ui/button"

import BustOfWomanWithFlowers from "../../assets/bust-of-woman-with-flowers.svg"
import Channel4IconBlack from "../../assets/channel-4-icon-black.svg"

const SignUp = () => {
  return (
    <div className="mx-7 flex flex-col justify-center">
      <div className="bg-c4-gradient-main my-5 flex h-40 rounded-br-3xl rounded-tl-3xl">
        <Image
          priority
          className="relative top-12 z-10"
          src={BustOfWomanWithFlowers}
          alt="Bust of woman with flowers"
        />
        <Image priority src={Channel4IconBlack} alt="Channel 4 icon black" />
      </div>
      <h2 className="my-5">
        transverse <span className="">random content</span> from all over the
        internet.
      </h2>
      <p className="my-5">
        Unlock a world of surprises and laughter with Channel 4! Explore random
        content, and submit the creative gems with our community. 🎉✨
      </p>
      <Button
        variant="outline"
        className="rounded-full border-green-500 py-6 text-green-500"
      >
        Start your journey
      </Button>
      <Button
        variant="outline"
        className="mt-4 rounded-full border-transparent py-6 text-green-500 hover:border-green-500"
      >
        Already have the key?
      </Button>
    </div>
  )
}

export default SignUp
