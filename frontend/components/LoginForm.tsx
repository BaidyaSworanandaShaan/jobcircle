"use client";

import { useState } from "react";
import Image from "next/image";
import { Form, Formik, FormikHelpers } from "formik";
import { loginSchema } from "@/lib/validationSchemas";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import LoginImage from "../public/login-illustration.png";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setMessage(null); // reset previous messages
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );
      login(response.data.accessToken, response.data.user);
      console.log(response);
      const userRole = response?.data?.user?.role;

      setMessage({
        type: "success",
        text: response.data.message || "Login successful!",
      });
      setTimeout(() => {
        if (userRole === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage({
          type: "error",
          text: error.response.data.message || "Something went wrong",
        });
      } else {
        setMessage({
          type: "error",
          text: "Network error or unexpected issue",
        });
        console.error("Error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Image */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto">
        <Image
          src={LoginImage}
          alt="Login Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="lg:w-1/2 flex flex-col justify-center p-8 bg-white relative">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <Link href="/">
              <span className="text-2xl font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                @JobCircle
              </span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Login to Your Account
          </h2>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Log in"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Message at the bottom */}
          {message && (
            <div
              className={`mt-4 text-sm p-3 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <p className="text-sm text-gray-600 text-center mt-6">
            Dont have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
