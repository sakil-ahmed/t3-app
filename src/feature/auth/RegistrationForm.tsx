"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function RegistrationForm() {
  const formSchema = z.object({
    name: z.string().min(3, "name must contain at least 3 character(s)"),
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Email must be a valid email" }),
    password: z.string().min(6, "password must be at least 6 character(s)"),
  });

  type dataType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(formSchema),
  });
  const { mutate, isLoading } = api.users.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      const signInData = {
        email: data.email,
        password: data.password,
        method: "signUp",
      };
      void signIn("credentials", {
        ...signInData,
        redirect: false,
      });
    },
  });
  const onSubmit = (data: dataType) => {
    mutate({ ...data });
  };

  return (
    <form className="w-full max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button
              type={"button"}
              onClick={() =>
                signIn("github", { redirect: true, callbackUrl: "/tasks" })
              }
              variant="outline"
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              type={"button"}
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/tasks" })
              }
              variant="outline"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your full name"
            />
            {errors.name ? (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="m@example.com"
            />
            {errors.email ? (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className={"flex-col gap-5"}>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Loading..." : "Create account"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link href={"/auth/login"}>Login</Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
