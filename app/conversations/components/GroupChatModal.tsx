"use client"

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const GroupChatModal:React.FC<{
    users:User[],
    isOpen:boolean,
    onClose:()=>void
}> = ({users, isOpen, onClose}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = async (data:FieldValues) => {
        setIsLoading(true)
        axios.post('/api/conversations',{
            ...data,
            isGroup:true
        })
        setIsLoading(false)
    }

    return (
        <div>
            groupChatModal
        </div>
    );
};

export default GroupChatModal;