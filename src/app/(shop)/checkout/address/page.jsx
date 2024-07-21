import AddressForm from "@/components/ui/address/AddressAdd"
import { AddressList } from "@/components/ui/address/AddressList"
export default function () {
    return (
        <div className="flex w-4/5 mx-auto">            
            <AddressList />
            <AddressForm />
        </div>
    )
}