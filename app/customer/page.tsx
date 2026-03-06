import { Customer, Service } from "@/app/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert-dialog";
import { getCookies } from "@/lib/server-cookie";
import { X } from "lucide-react";
import AddCustomer from "./add";
import EditCustomer from "../admin/service/edit ";
import DeleteCustomer from "./delete";
import search from "@/components/search";
import Pagination from "@/components/pagination";
import ResetPassword from "./reset";

// --- Types ---

type ResultData = {
  success: boolean;
  message: string;
  data: Customer[];
  count: number;
};

type ServiceData = {
  success: boolean;
  message: string;
  data: Service[];
  count: number;
};

type Props = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    quantity?: string;
  }>;
};

// --- API Functions ---

async function getCustomers(
  page: number,
  quantity: number,
  search: string
): Promise<ResultData> {
  try {
    const token = await getCookies("accessToken");
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers?page=${page}&quantity=${quantity}&search=${search}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseData: ResultData = await response.json();

    if (!response.ok) {
      console.log(responseData.message);
      return {
        success: responseData.success,
        message: responseData.message,
        data: [],
        count: 0,
      };
    }

    return {
      success: responseData.success,
      message: responseData.message,
      data: responseData.data,
      count: responseData.count,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch customers",
      data: [],
      count: 0,
    };
  }
}

async function getServices(): Promise<Service[]> {
  try {
    const token = await getCookies("accessToken");
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services?quantity=1000`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseData: ServiceData = await response.json();

    if (!response.ok) {
      console.log(responseData.message);
      return [];
    }

    return responseData.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// --- Main Component ---

export default async function ServicesPage(prop: Props) {
  const searchParams = await prop.searchParams;
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const quantity = Number(searchParams?.quantity) || 5;

  const services = await getServices();
  const { count: counts, data: customers } = await getCustomers(page, quantity, search);

  return (
    <div>
      <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold mb-2">Customer Data</h4>
        <p className="text-sm text-slate-500 mb-4">
          This page displays customers data, view details, search, and manage service items.
        </p>

        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md grow">
            <Search search={search} />
          </div>

          {/* Add Button */}
          <div className="ml-4">
            <AddCustomer serviceData={services} />
          </div>
        </div>

        <div className="m-2">
          {customers.length === 0 ? (
            <Alert>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>No data available</AlertDescription>
            </Alert>
          ) : (
            customers.map((customer, index) => (
              <div key={index} className="flex flex-wrap shadow-sm border rounded-lg p-4 mb-2">
                <div className="w-full md:w-4/16 p-2">
                  <small className="text-xs font-bold text-primary">Customer ID</small>
                  <p>{customer.customer_number}</p>
                  <small className="text-xs font-bold text-primary">Name</small>
                  <p>{customer.name}</p>
                </div>
                
                <div className="w-full md:w-4/16 p-2">
                  <small className="text-xs font-bold text-primary">Phone</small>
                  <p>{customer.phone}</p>
                  <small className="text-xs font-bold text-primary">Address</small>
                  <p>{customer.address}</p>
                </div>

                <div className="w-full md:w-4/16 p-2">
                  <small className="text-xs font-bold text-primary">Service</small>
                  <p>{customer.service?.name || "-"}</p>
                </div>

                <div className="w-full md:w-4/16 p-2">
                  <small className="text-xs font-bold text-primary">Action</small>
                  <div className="flex gap-2 mt-1">
                    <ResetPassword selectedData={customer} />
                    <EditCustomer selectedData={customer} serviceData={services} />
                    <DeleteCustomer selectedData={customer} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="my-3 bg-slate-50 p-2 rounded-md">
          <Pagination count={counts} currentPage={page} getPage={quantity} />
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";