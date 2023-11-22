'use client'

import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub,BsGoogle } from 'react-icons/bs';
import toast from "react-hot-toast";
import { signIn,useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AutoForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if(session?.status === 'authenticated'){
          router.push('/users')
        }
      },[session?.status,router])

    const toggleVariant = useCallback(()=> {
       if(variant === 'LOGIN'){
              setVariant('REGISTER');
       }else {
        setVariant('LOGIN');
       }
    },[variant])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if(variant === 'REGISTER'){
           axios.post('/api/register',data).then(()=>signIn('credentials', data))
           .catch((err)=>{
            toast.error('something went wrong')
           }).finally(()=> setIsLoading(false)) 
        }

        if(variant === 'LOGIN'){
            signIn('credentials',{
               ...data,
               redirect:false
            }).then((callback)=>{
                 if(callback?.error){
                    toast.error('invalid credentials')
                 }
                 if(callback?.ok && !callback?.error){
                    toast.success('logged in!')
                 }
            }).finally(()=> setIsLoading(false))
        }
    }

    const socialAction = (action:string) => {
        setIsLoading(true);

        signIn(action,{
            redirect: false,
        }).then((callback)=>{
            if(callback?.error){
               toast.error('something went wrong')
            }
            if(callback?.ok && !callback?.error){
               toast.success('logged in!')
               router.push('/users')
    }}).finally(()=> setIsLoading(false))
}

    return (
        <div className="mt-8 sm:w-full sm:mx-auto sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
             <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              >
            {variant === 'REGISTER' && <Input
               id="name"
               label="name"
               register={register}
               errors={errors}
               disabled={isLoading}
               />}
               <Input
                id="email"
                label="Email address"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
               />
               <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                disabled={isLoading}
               />
               <div>
                <Button
                    disabled={isLoading}
                    type="submit"
                    fullWidth
                >{
                  variant === 'LOGIN' ? 'Sign in' : 'Register'
                }</Button>
               </div>
               <div className="mt-6">
                   <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                          </div>
                   </div>

                   <div className="mt-6 flex gap-2">
                     <AuthSocialButton
                        icon={BsGithub}
                        onClick={()=> socialAction('github')}
                     />
                      <AuthSocialButton
                        icon={BsGoogle}
                        onClick={()=> socialAction('google')}
                     />
                   </div>
               </div>
               <div className="flex gap-2 justify-center text-sm mt-2 px-2 text-gray-500">
                <div>
                  {
                  variant === 'LOGIN' ? 'New Messenger?' : 'Already have an account?'   
                  }
                </div>
                <div
                onClick={toggleVariant}
                className="underline cursor-pointer"
               >
               {variant === "LOGIN" ? "Create an account" : "Log in"}
               </div>
               </div>
             </form>
            </div>
        </div>
    );
};

export default AutoForm;