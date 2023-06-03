import { Skeleton } from "@/components/ui/skeleton"

export default function Loading(){
    return(
        <>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((data) => (
          <tr key={data}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-3">
                <Skeleton className="h-5 w-24 bg-gray-200"/>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
                <Skeleton className="h-5 w-44 bg-gray-200"/>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
                <Skeleton className="h-5 w-36 bg-gray-200"/>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm">
                <Skeleton className="h-5 w-20 bg-gray-200"/>
            </td>
            <td></td>
          </tr>
        ))}
      </>
    )
}