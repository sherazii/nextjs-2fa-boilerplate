"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Logo from "@/public/assets/images/logo-black.png";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { zSchema } from "@/lib/zodSchema";
import ButtonLoading from "@/components/application/ButtonLoading";
const LoginPagge = () => {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(3, "password is required"),
    });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eamil: "",
      password: "",
    },
  });

  const loginHandler = (values) => {
    console.log(values);
  };
  return (
    <Card className="w-100 text-center">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={Logo}
            className="max-w-[150px] h-auto"
            alt="logoImg"
            priority
          />
        </div>
        <CardTitle className="w-full text-center text-3xl font-bold font-[Pacifico] text-orange-500">
          Login Into Account
        </CardTitle>
        <p>Login into your account by filling out the form below.</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(loginHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      type={isTypePassword ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-4 top-[38px] cursor-pointer"
                    onClick={() => setIsTypePassword(!isTypePassword)}
                  >
                    {isTypePassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />

             <ButtonLoading
                  type="submit"
                  className="w-full rounded-full mt-4 cursor-pointer"
                  text="Login"
                  loading={loading}
                />

          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPagge;
