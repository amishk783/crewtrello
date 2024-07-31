"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import { Input } from "@/app/_components/Input";
import { cn } from "@/app/_utils";
import { Eye, Loader } from "lucide-react";
import Button from "../_components/Button";
import { useAuth } from "../providers/AuthProvider";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(1, "Password cannot be empty")
    .min(6, { message: "Should be greater than 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (formDetails: FormData) => {
    event?.preventDefault();
    const { email, password } = formDetails;
    setLoading(true);

    try {
      await logIn(email, password);
      router.push("/");
      toast.success("Hey, Missed You!", {
        className: " text-green-300",
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        className: " text-green-300",
      });
      console.log(error);
    }
    setLoading(false);
  };
  const handleViewPassword = () => {
    event?.preventDefault();
    setViewPassword((prevState) => !prevState);
  };
  return (
    <div className=" h-screen bg-red-50 md:pt-10  md:bg-white bg-gradient-to-t from-violet-400 via-violet-200 to-purple-100 text-black">
      <div className="w-[80%] h-[468px] mt-10 rounded-lg xl:w-[35%] xl:mx-auto bg-white">
        <div className="flex flex-col items-center justify-center px-8 w-full h-full">
          <h2 className="text-5xl font-semibold mb-8 text-center">
            Welcome to <span className=" text-violet-900">Workflo!</span>
          </h2>

          <form
            className="w-[95%] flex flex-col gap-5 rounded-lg "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="email"
              type="email"
              label="Email"
              register={register}
              error={errors.email}
              placeholder="Your Email"
            />
            <div className="relative flex items-center justify-end">
              <Input
                name="password"
                type={viewPassword ? "text" : "password"}
                label="Password"
                register={register}
                error={errors.password}
                placeholder="Password"
              />
              <Button
                variant="ghost"
                className={cn(
                  "absolute mr-4 focus:outline-none",
                  viewPassword ? "text-blue-500" : ""
                )}
                onClick={handleViewPassword}
              >
                <Eye />
              </Button>
            </div>

            <Button
              className="my-2 flex items-center justify-center gap-3 bg-gradient-to-b from-purple-500 via-purple-600 to-violet-700 border-purple-700 border-2"
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading}
            >
              Log in
              {loading ? <Loader className=" animate-spin" /> : ""}
            </Button>
          </form>
          <div className="flex py-4 items-center justify-center text-xl text-zinc-600">
            <h2>Dont have an account? Create a</h2>
            <Link href="/signup">
              <Button variant="ghost" className="text-blue-600 pl-2">
                new account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
