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