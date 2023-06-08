import { clsx, type ClassValue } from "clsx"
import { Contract, ContractTransaction, JsonRpcProvider } from "ethers"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getRawTransactionToSign(
  fuction: string,
  params: any[]
): Promise<ContractTransaction> {
  const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!)
  const urlContract = new Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    process.env.NEXT_PUBLIC_CONTRACT_ABI!,
    provider
  )
  const metaTransaction = await urlContract[fuction].populateTransaction(
    ...params
  )
  return metaTransaction
}
