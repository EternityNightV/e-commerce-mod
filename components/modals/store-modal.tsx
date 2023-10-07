'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import { useForm } from 'react-hook-form'
import { useStoreModal } from "@/hooks/use-store-modal"
import { useState } from "react"

import {
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "../ui/form"

import { Modal } from "../ui/modal"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import toast from "react-hot-toast"

const formSchema = z.object({
    name : z.string().min(1),
});


export const StoreModal  = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : "",
        }
    });

    const onSubmit = async ( values : z.infer<typeof formSchema>) => {
       try {
        setIsLoading(true)

        const response = await axios.post('api/stores', values);

        toast.success('Created store.')
       } catch (error) {
        toast.error('Something went wrong.')
        
       } finally {
        setIsLoading(false)
       }
    }

    const storeModal = useStoreModal();

    const [ isLoading, setIsLoading] = useState(false)

    return (
    <Modal
    title="create store"
    description="222"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    placeholder="E-comm" 
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="pt-6 space-x-2 flex justify-end w-full">
                           <Button 
                           disabled={isLoading}
                           variant='outline' 
                           onClick={storeModal.onClose}>
                                Cancel
                            </Button>
                           <Button 
                           disabled={isLoading}
                           type="submit">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    )
}