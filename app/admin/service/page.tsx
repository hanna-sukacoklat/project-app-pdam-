import { getCookies } from "@/lib/server-cookie";
import { Service } from "@/app/types";
import AddService from "./add";
import { Dialog } from "@/components/ui/dialog";
import Search from "@/components/search";
import { count } from "console";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

type ResultData = {
    success: boolean,
    message: string,
    data: Service[]
    count: number
}


async function getServices(Page: number, quantity: number, search: string): Promise<Service[]> {
    try {
        const token = await getCookies('AccessToken');
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?page=${Page}&quantity=${quantity}&search=${search}`;
        
        const response = await fetch(url, 
            {
                method: "GET",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store"
            }
        );

        const responseData: ResultData = await response.json()

        if (!response.ok) {
            console.log(responseData?.message)
            return {
                success: responseData?.success,
                message: responseData?.message,
                data: [],
                count: 0,
            };
        }
        
        return {
            success: responseData?.success,
            message: responseData?.message,
            data: responseData?.data,
            count: responseData?.count
        }

    } catch (error) {
        console.log(error)
        return [];
    }
}

type Props = {
    searchParams: Promise<{
        search: string,
        page: number,
        quantity: number
    }>
}

export default async function ServicesPage (props: Props)  {
    const page = (await props.searchParams).page || 1;
    const quantity = (await props.searchParams).quantity || 5;
    const search = (await props.searchParams).search || "";
    const searchParams = await props.searchParams;
    const services = await getServices(searchParams.page, searchParams.quantity, searchParams.search);
    return (
        <div>
            <h1>Service Page</h1>
            <div>
                <AddService/>
                <Dialog/>
            </div>

            <div className = " flex justify-between items-center m-4">
                {/* Search bar */}
                <div className = " flex items-center w-full max-w-md grow">
                    <Search search={search ?? ""}/>
                </div>

                {/* add button */}
                <div className="ml-4">
                    <AddService/>
                </div>
                 </div>
            {
                services.length == 0 ? "Data Service Tidak Ada" :
                    <div>
                        {services.map((service: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; min_usage: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; max_usage: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {
                            return (
                                <div key={service.id}>0
                                    <h2>Nama : {service.name}</h2>
                                    <p>Layanan</p>
                                    <p>{service.min_usage} - {service.max_usage}</p>
                                </div>
                            )
                        })
                        }
                    </div>
            }
        </div>
    
    )
}