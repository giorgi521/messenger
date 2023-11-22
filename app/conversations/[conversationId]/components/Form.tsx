"use client"
import useConveration from '@/app/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from 'react-icons/hi2';
import { CldUploadButton } from 'next-cloudinary';

const Form = () => {

    const { conversationId } = useConveration();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
       defaultValues:{
        message:''
       }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
          ...data,
          conversationId: conversationId
        })
      }

      const handleUpload = (result: any) => {
         axios.post('/api/messages',{
            image: result?.info?.secure_url,
            conversationId
         })        
      }

    return (
        <div className='p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
            <CldUploadButton
              options={{maxFiles:1}}
              onUpload={handleUpload}
              uploadPreset="i50j55u9"
            >
                <HiPhoto size={30} className="text-sky-500 cursor-pointer"/>
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2 items-center lg:gap-4 w-full'>
                <MessageInput
                  id='message'
                  register={register}
                  errors={errors}
                  required
                  placeholder='Write a message'
                />
                <button
                  type='submit'
                  className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
                >
                 <HiPaperAirplane size={18} className="text-white"/>
                </button>
            </form>
        </div>
    );
};

export default Form;