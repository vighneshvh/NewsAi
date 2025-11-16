"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { resetPasswordSchema } from "@/lib/schema";
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

import AuthCard from "@/components/auth/authcard";

import { useState, useTransition } from "react";

import FormSuccess from "@/components/auth/formSuccess";
import FormError from "@/components/auth/formError";

function ForgotPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.post("/api/forgot-password", values);

        if (response.data?.success) {
          setSuccess(response.data?.success);
        }

        if (response.data?.error) {
          setError(response.data.error);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <AuthCard header='Reset Password' footertext='Sign In' footerlink='/signin'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='tyson@example.com'
                        className='border-black focus:border-2'
                        disabled={isPending}
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
              className='w-full  bg-white'
              disabled={isPending}>
              {isPending ? (
                <svg
                  className='animate-spin h-5 w-5 mr-3 text-white bg-white'
                  viewBox='456 45 54 0'></svg>
              ) : (
                "Send Reset Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </AuthCard>
  );
}

export default ForgotPasswordForm;
