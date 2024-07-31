"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/app/_utils";

import { Input } from "@/app/_components/Input";
import { useState } from "react";
import { Eye, Loader } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../_components/Button";
import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
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
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { signUp } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const onSubmit = async (formDetails: FormData) => {
    event?.preventDefault();
    const { email, password, name } = formDetails;
    setLoading(true);
    try {
      await signUp(name, email, password);

      router.push("/");
      toast("Welcome Aboard!", {
        className: " text-green-300",
      });
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed. Please try again.");
    }
    setLoading(false);
  };
  const handleViewPassword = () => {
    event?.preventDefault();
    setViewPassword((prevState) => !prevState);
  };
  return (
    <div className=" h-screen bg-red-50 md:pt-10  md:bg-white bg-gradient-to-t from-violet-400 via-violet-200 to-purple-100 text-black">
      <div className="w-[80%] h-[556px] mt-10 rounded-lg xl:w-[35%] xl:mx-auto bg-white">
        <div className="flex flex-col items-center justify-center px-8 w-full h-full">
          <h2 className="text-5xl font-semibold mb-8 text-center font-barlow">
            Welcome to <span className=" text-violet-900">Workfolio!</span>
          </h2>

          <form
            className="w-[95%] flex flex-col gap-5 rounded-lg "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="name"
              type="text"
              label="name"
              register={register}
              error={errors.name}
              placeholder="Joe Gardner"
            />
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
              Sign up
              {loading ? <Loader className=" animate-spin" /> : ""}
            </Button>
          </form>
          <div className="flex py-4 items-center justify-center text-xl text-zinc-600">
            <h2>Already have an account?</h2>
            <Link href="/login">
              <Button variant="ghost" className="text-blue-600">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
