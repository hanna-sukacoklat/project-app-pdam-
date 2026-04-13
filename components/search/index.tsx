"use client"

import { useRouter } from "next/navigation"
import { KeyboardEvent, useState } from "react"
 
type Props = {
    search: string
}

const Search = ({ search }: Props) => {
    const [Keyword, setKeyword] = useState<string>(search)
    const router = useRouter();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            const params = new URLSearchParams(window.location.search);
            if(Keyword.trim()) {
                params.set("search", Keyword);
            } else {
                params.delete("search");
            }
            router.push(`?${params.toString()}`)
        }
    }   

    // ← Return JSX di sini, di luar handleKeyDown
    return (
        <div className="w-full">
            <input 
                id="Keyword" 
                type="text" 
                value={Keyword} 
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword of search"
                onKeyDown={handleKeyDown}  // ← Ganti onKeyUp ke onKeyDown
                className="w-full border border-primary rounded-md p-2 bg-white text-black"
            />
        </div>
    )
}

export default Search;