"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/lib/auth/AuthContext";
import { AuthSocial } from "@/components/auth/social/auth";
import { useLoading } from "../LoadingProvider";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MailIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type FromSignInSchema = z.infer<typeof signInSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { login } = useAuth();
  const { setLoading, loading } = useLoading();
  const router = useRouter();
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const form = useForm<FromSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: FromSignInSchema) => {
    setLoading(true);
    try {
      await login(data);
      // router.push("/dashboard");
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });

      form.setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                              <MailIcon size={16} aria-hidden="true" />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={isVisible ? "text" : "password"}
                              placeholder="Password"
                              {...field}
                            />
                            <button
                              className="cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label={
                                isVisible ? "Hide password" : "Show password"
                              }
                              aria-pressed={isVisible}
                              aria-controls="password"
                            >
                              {isVisible ? (
                                <EyeOffIcon size={16} aria-hidden="true" />
                              ) : (
                                <EyeIcon size={16} aria-hidden="true" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button disabled={loading} type="submit" className="w-full">
                  Sign In
                  {loading && <Loader2Icon className="animate-spin" />}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <AuthSocial />
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-background relative hidden md:block p-1">
              <img
                src="/bg-signin.svg"
                alt="Image"
                className=" h-full w-full "
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </form>
    </Form>
  );
}
