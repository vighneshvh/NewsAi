"use client";
import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { newPasswordSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Button } from "../ui/button";

import Authcard from "@/components/auth/authcard";

import { useState, useTransition } from "react";

import FormSuccess from "@/components/auth/formSuccess";

import { useRouter, useSearchParams } from "next/navigation";
import FormError from "@/components/auth/formError";
import axios from "axios";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!token) {
    setError("Token not found");
  }

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.post("/api/reset-password", {
          values,
          token,
        });

        if (response.data?.success) {
          setSuccess("Password reset successfully!");
          router.push("/signin");
        }

        if (response.data?.error) {
          setError(response.data.error);
        }
      } catch (error) {
        // @ts-expect-error error response
        setError(error.response.data.error);
      }
    });
  }

  return (
    <Authcard
      header='Reset Your Password'
      footertext='Login'
      footerlink='/signin'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='*******'
                        className='border-black focus:border-2'
                        disabled={isPending}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type='submit'
              className='w-full bg-black'
              disabled={isPending}>
              {isPending ? (
                <svg
                  className='animate-spin h-5 w-5 mr-3 text-white bg-white'
                  viewBox='456 45 54 0'></svg>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Authcard>
  );
}

export default ResetPasswordForm;
