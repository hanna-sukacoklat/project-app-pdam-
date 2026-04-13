"use client"

import { useRouter } from "next/router";
import { Service } from "../../types"
import { FormEvent, useState } from "react";
import { Button, Input } from "@base-ui/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Label as RadixLabel } from "@radix-ui/react-label";

export const AddCustomer = ({
    serviceData
}: {
    serviceData: Service[]
}) => {
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [alamat, setAlamat] = useState<string>("");
    const [customer_number, setCustomerNumber] = useState<string>("");
    const [service_id, setServiceId] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    
const openModal = () => {
    setOpen(true);
    setName("");
    setUsername("");
    setPhone("");
    setAlamat("");
    setCustomerNumber("");
    setServiceId(0);
    setPassword("");
};

function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("Form submitted");
}

return (
        <div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={openModal}>add data customer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>
              Add a new customer. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <div>
              <RadixLabel htmlFor="username">Username</RadixLabel>
              <Input id="username" name="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <RadixLabel htmlFor="password">Password</RadixLabel> 
              <Input id="password" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <RadixLabel htmlFor="name">Name</RadixLabel> 
              <Input id="name" name="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <RadixLabel htmlFor="customer_number">Customer Number</RadixLabel> 
              <Input id="customer_number" name="customer_number" type="text" placeholder="Customer Number" value={customer_number} onChange={(e) => setCustomerNumber(e.target.value)} />
            </div>
            <div>
              <RadixLabel htmlFor="phone">Phone</RadixLabel> 
              <Input id="phone" name="phone" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <RadixLabel htmlFor="address">Address</RadixLabel> 
              <textarea id="address" name="address" placeholder="Address" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            </div>
            <div>
                <RadixLabel htmlFor="service">Service</RadixLabel>
                <select 
                className="w-full border p-2"
                value={service_id}
                onChange={(e) => setServiceId(Number(e.target.value))}
                >
                    <option value={0}>Select Service</option>
                    {serviceData.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}</option>
                    ))}
                </select>
            </div>
          </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
            </div>
        </div>
    )
}

