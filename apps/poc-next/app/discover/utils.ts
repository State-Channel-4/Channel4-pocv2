import { C4Content, TagMap } from "@/types";
import { Wallet } from "ethers";
import { Fetcher } from "swr";



import { getRawTransactionToSign } from "@/lib/utils"

export const getMix: Fetcher<
  { urls: C4Content[] },
  { tags: TagMap; page: number; limit?: number }
> = ({ tags, limit = "100", page }) => {
  const tagQueries = new URLSearchParams()
  tags.forEach((tag) => tagQueries.append("tags", tag._id))
  tagQueries.append("page", page.toString() || "1")
  tagQueries.append("limit", limit.toString() || "100")
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mix?${tagQueries.toString()}`
  ).then((response) => response.json())
}

export const updateLikesInApi = async (
  contentId: string,
  encrypted: string,
  password: string,
  token: string,
  userId: string
) => {
  const functionName = "likeURL"
  const params = [2] // TODO: use a url id compatible with Solidity (object_id cannot be casted to bigint. I think it is too large)
  const metaTx = await getRawTransactionToSign(functionName, params)
  const wallet = Wallet.fromEncryptedJsonSync(encrypted!, password!)
  const signedLikeUrlTx = await wallet?.signTransaction(metaTx)
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/${contentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      signedMessage: signedLikeUrlTx,
      address: wallet.address,
      functionName: functionName,
      params: params,
      // TODO: temp params for mongodb
      userId: userId,
    }),
  }).then((response) => {
    return response.json()
  })
}

export const feedbackMessages = {
  "not-found": "No content found for the selected tags. Please try again.",
  "no-tags": "No tags selected. Please select at least one tag.",
  loading: "Loading content...",
}