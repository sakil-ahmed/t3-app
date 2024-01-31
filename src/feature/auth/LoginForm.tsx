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
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export function LoginForm() {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Email must be a valid email" }),
    password: z.string().min(6, "password must be at least 6 characters"),
  });

  type dataType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: dataType) => {
    const neData = {
      ...data,
      method: "",
    };
    const res = await signIn("credentials", {
      ...neData,
      redirect: false,
    });
  };

  return (
    <form className="w-full max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            Login to Your account
          </CardTitle>
          <CardDescription>
            {/*Enter your email below to create your account*/}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button
              onClick={() =>
                signIn("github", { redirect: true, callbackUrl: "/tasks" })
              }
              type={"button"}
              variant="outline"
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/tasks" })
              }
              type={"button"}
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
        <CardFooter className="flex-col gap-5">
          <Button type={"submit"} className="w-full">
            Login
          </Button>
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href={"/auth/registration"}>Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
