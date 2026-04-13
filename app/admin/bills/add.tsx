"use client"

import { getCookie } from "cookies-next";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer, Service } from "@/app/types";

const AddBill = ({
    customerData,
    serviceData
}: {
    customerData: Customer[]
    serviceData: Service[]
}) => {

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false)

    const [customer_id, setCustomerId] = useState<number>(0)
    const [service_id, setServiceId] = useState<number>(0)
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(2025)
    const [measurement_number, setMeasurementNumber] = useState<string>("")
    const [usage_value, setUsageValue] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [paid, setPaid] = useState<boolean>(false)

    const openModal = () => {
        setOpen(true)

        setCustomerId(0)
        setServiceId(0)
        setMonth(0)
        setYear(2025)
        setMeasurementNumber("")
        setUsageValue(0)
        setPrice(0)
        setPaid(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const token = await getCookie("accessToken")
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/bills`

            const payload = JSON.stringify({
                customer_id,
                service_id,
                month,
                year,
                measurement_number,
                usage_value,
                price,
                paid
            })

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: payload
            })

            const result = await response.json()

            if (result?.success) {
                setOpen(false)
                toast.success(result.message)
                setTimeout(() => router.refresh(), 100)
            } else {
                toast.warning(result.message)
            }

        } catch (error) {
            toast.error(`something went wrong ${error}`)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button onClick={openModal} variant="default">
                        Add Bill
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">

                    <form onSubmit={handleSubmit}>
                        <DialogHeader>

                            <DialogTitle>Add Bill</DialogTitle>

                            <DialogDescription>
                                Add new bill data here. Click save when you're done.
                            </DialogDescription>

                        </DialogHeader>

                        <FieldGroup>

                            <Field>
                                <Label>Customer</Label>
                                <select
                                    className="w-full border p-2"
                                    value={customer_id}
                                    onChange={(e) => setCustomerId(Number(e.target.value))}
                                >
                                    <option value="">~Select Customer~</option>
                                    {customerData.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </Field>


                            <Field>
                                <Label>Month</Label>
                                <Input
                                    type="number"
                                    placeholder="1 - 12"
                                    value={month}
                                    onChange={(e) => setMonth(Number(e.target.value))}
                                />
                            </Field>

                            <Field>
                                <Label>Year</Label>
                                <Input
                                    type="number"
                                    placeholder="2025"
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                />
                            </Field>

                            <Field>
                                <Label>Measurement Number</Label>
                                <Input
                                    type="text"
                                    placeholder="MTR-001"
                                    value={measurement_number}
                                    onChange={(e) => setMeasurementNumber(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <Label>Usage Value</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={usage_value}
                                    onChange={(e) => setUsageValue(Number(e.target.value))}
                                />
                            </Field>

                            <Field>
                                <Label>Paid Status</Label>
                                <select
                                    className="w-full border p-2"
                                    value={paid ? "true" : "false"}
                                    onChange={(e) => setPaid(e.target.value === "true")}
                                >
                                    <option value="false">Not Paid</option>
                                    <option value="true">Paid</option>
                                </select>
                            </Field>

                        </FieldGroup>

                        <DialogFooter className="mb-4">

                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>

                            <Button type="submit">Save</Button>

                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddBill;