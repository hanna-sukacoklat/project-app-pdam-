export interface Admin {
  id: number
  user_id: number
  name: string
  phone: string
  owner_token: string
  createdAt: string
  updatedAt: string
  user: user
}

export interface Customer {
  address: string
  id: number
  user_id: number
  name: string
  username: string
  phone: string
  alamat: string
  customer_number: string
  owner_token: string
  createdAt: string
  updatedAt: string
  user: user
}

export interface Service {  
  id: number
  name: string
  min_usage: number
  max_usage: number
  price: number
  owner_token: string
  createdAt: string
  updatedAt: string
}


export interface user {
  id: number
  username: string
  password: string
  role: string
  owner_token: string
  createdAt: string
  updatedAt: string
}

export interface Root {
  services: any
  id: number
  customer_id: number
  admin_id: number
  service_id: number
  month: number
  year: number
  measurement_number: string
  usage_value: number
  price: number
  paid: boolean
  owner_token: string
  createdAt: string
  updatedAt: string
}

export type BillStatus = 'paid' | 'unpaid' | 'pending';

export interface Bill {
  id: number;
  customer_id: number;
  customer_name: string;
  no_meter: string;
  periode: string;
  amount: number;
  status: BillStatus; // Menggunakan union type, bukan string
  due_date: string;
  pemakaian: number;
  total_tagihan: number;
  dibayar_at?: string;
}

