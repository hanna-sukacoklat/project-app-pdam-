import { getCookie } from "@/lib/client-cookies";
import { Root, Customer, Service } from "@/app/types";
import AddBill from "./add";
import Search from "@/components/search";
import { getCookies } from "cookies-next";

type ResultData = {
  success: boolean;
  message: string;
  data: Root[];
  count: number;
};

type CustomerData = {
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

async function getBills(
  page: number,
  quantity: number,
  search: string
): Promise<ResultData> {
  try {
    const cookies = await getCookies();
    const token = cookies?.accessToken;
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/bills`;

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
      return {
        success: responseData.success,
        data: responseData.data,
        message: responseData.message,
        count: responseData.count,
      };
    }

    return responseData;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: "Error fetching bills",
      count: 0,
    };
  }
}

async function getCustomers(): Promise<Customer[]> {
  try {
    const cookies = await getCookies();
    const token = cookies?.accessToken;
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers?quantity=100`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data: CustomerData = await response.json();

    if (!response.ok) return [];

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getServices(): Promise<Service[]> {
  try {
    const cookies = await getCookies();
    const token = cookies?.accessToken;
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?quantity=100`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data: ServiceData = await response.json();

    if (!response.ok) return [];

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

type Props = {
  searchParams: Promise<{
    page?: number;
    quantity?: number;
    search?: string;
  }>;
};

export default async function BillsPage(prop: Props) {
  const page = (await prop.searchParams)?.page || 1;
  const quantity = (await prop.searchParams)?.quantity || 5;
  const search = (await prop.searchParams)?.search || "";

  const { data: bills } = await getBills(page, quantity, search);
  const customers = await getCustomers();
  const services = await getServices();

  return (
    <div>
      <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold mb-2">Bill Data</h4>

        <p className="text-sm text-slate-500 mb-4">
          This page displays bill data, including usage, price, and payment
          status. You can add, edit, delete, and search bill data.
        </p>

        <div className="flex justify-between items-center m-4">
          
          {/* Search */}
          <div className="flex items-center w-full max-w-md grow">
            <Search search={search} />
          </div>

          {/* Add Bill */}
          <div className="ml-4">
            <AddBill customerData={customers} serviceData={services} />
          </div>
        </div>
      </div>

      {bills.length === 0 ? (
        "Data bill tidak ada"
      ) : (
        <div>
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md"
            >
              <h2>Customer ID: {bill.customer_id}</h2>

              <p>Month: {bill.month}</p>
              <p>Year: {bill.year}</p>
              <p>Usage: {bill.usage_value}</p>
              <p>Price: {bill.price}</p>
              <p>Service ID: {bill.service_id}</p>
              <p>Paid: {bill.paid ? "Yes" : "No"}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}