"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination";

type Props = {
    count: number;
    perPage: number;
    currentPage: number; 
}

export default function SimplePagination({ 
    count, 
    perPage, 
    currentPage 
}: Props) {
    const totalPage = Math.ceil(count / perPage); // berapa total halaman yang dibutuhkan
    const isFirstPage = currentPage === 1; // ini untuk mengecek apakah kita berada di halaman pertama dan akan menonaktifkan tombol "Previous" jika kita berada di halaman pertama
    const isLastPage = currentPage === totalPage; // ini untuk mengecek apakah kita berada di halaman terakhir dan akan menonaktifkan tombol "Next" jika kita berada di halaman terakhir

    const router = useRouter(); // ini untuk mengakses router dari Next.js yang akan kita gunakan untuk navigasi antar halaman
    const searchParams = useSearchParams(); // ini untuk mengakses search params dari URL yang akan kita gunakan untuk mendapatkan query parameter "page" yang akan kita gunakan untuk menentukan halaman saat ini

    const changePage = (Page: number) => {
        const safepage = Math.min(Math.max(Page, 1), totalPage); // ini untuk memastikan bahwa halaman yang kita tuju tidak kurang dari 1 dan tidak lebih dari total halaman yang tersedia
        
        const params = new URLSearchParams(searchParams.toString()) 
        params.set("page", safepage.toString()) // ini untuk mengubah query parameter "page" dengan halaman yang baru
        router.push(`?${params.toString()}`) 
    }

    const generatePages = () => {
        const pages = [];

        let strat = Math.max(currentPage - 2,1)
        let end = Math.min(currentPage + 2, totalPage)

        for (let i = strat; i <= end; i++) {
            pages.push(i);
        }
        
        return pages;
    }

    return (
    <Pagination>
      <PaginationContent>
      {/* previous */}
        <PaginationItem>
          <PaginationPrevious
           onClick={() => !isFirstPage && changePage(currentPage - 1)}
           className={isFirstPage ? "pointer-events-none opacity-50" : ""}
           />
        </PaginationItem>

        {/* first elipsis */}
        {currentPage > 3 && (
          <> 
          <PaginationItem>
          <PaginationLink onClick={() => changePage(1)}>
            1
            </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        </>
        )}

        {/* page number */}
        {generatePages().map((page) => (
            <PaginationItem key={page}>
                <PaginationLink
                isActive={page === currentPage}
                onClick={() => changePage(page)}
                >
                {page}
                </PaginationLink>
            </PaginationItem>
        ))}

        {/* last elipsis */}
        {currentPage < totalPage - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => changePage(totalPage)}>
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

            {/* next */}
            <PaginationItem>
            <PaginationNext
              onClick={() => !isLastPage && changePage(currentPage + 1)}
              className={isLastPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}


