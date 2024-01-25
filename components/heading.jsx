import { orbitron } from "@/app/fonts";

export default function Heading({children}) {
  return (
    <h1 className="font-bold font-orbitron text-2xl mb-3">
      {children}
    </h1>
  )
}
