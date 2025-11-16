"use client";

import { SignInSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Authcard from "./authcard";
import axios from "axios";
import { useRouter } from "next/navigation";
import FormSuccess from "./formSuccess";
import FormError from "./formError";
import { signIn as nextAuthSignIn } from "next-auth/react";

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.post("/api/signin", values);

        if (response.status === 200) {
          window.location.reload();
          router.push("/onboard");
        }
        if (response.status === 201) {
          setSuccess(response.data.success);
        }

        if (response.data.error) {
          setError(response.data.error);
        }

        return response.data;
      } catch (error) {
        // @ts-expect-error error response
        setError(error.response?.data?.error);
      }
    });
  }

  return (
    <Authcard
      header='Sign-In'
      footertext='Forgot password'
      footerlink='/forgot-password'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type='email'
                    className='dark:bg-black bg-white dark:text-white text-black focus:dark:bg-black focus:bg-white active:dark:bg-black active:bg-white'
                    placeholder='you@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className=' dark:bg-black bg-white dark:text-white text-black relative'>
                    <Input
                      disabled={isPending}
                      className='dark:bg-black bg-white dark:text-white text-black focus:dark:bg-black focus:bg-white active:dark:bg-black active:bg-white'
                      type={showPassword ? "text" : "password"}
                      placeholder='••••••'
                      {...field}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type='submit'
            disabled={isPending}
            className='cursor-pointer w-full'>
            Sign in
          </Button>
        </form>
      </Form>
      <div className='mt-6 space-y-3'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-gray-300 dark:border-gray-600' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white dark:bg-[#171717] text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>
        <Button
          type='button'
          onClick={() => nextAuthSignIn("google", { redirectTo: "/dashboard" })}
          className='w-full'
          variant='outline'>
          <svg className='w-4 h-4 mr-2' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='currentColor'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='currentColor'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='currentColor'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          Google
        </Button>
      </div>
    </Authcard>
  );
}

export default SigninForm;
