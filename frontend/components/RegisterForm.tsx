"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerSchema } from "@/lib/validationSchemas";
import RegistrationImage from "../public/registration-vector.png";
import Image from "next/image";
import Link from "next/link";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValues>
  ) => {
    setMessage(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        name: values.username,
        email: values.email,
        password: values.password,
      });

      setMessage({
        type: "success",
        text: response.data.message || "Registration successful!",
      });
      resetForm();
      setTimeout(() => router.push("/login"), 2000);
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
        console.error(error);
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
          src={RegistrationImage}
          alt="Register Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center p-8 bg-white relative">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <Link href="/">
              <span className="text-2xl font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                @JobCircle
              </span>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account
          </h2>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Input
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                />
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
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="••••••••"
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Form>
            )}
          </Formik>

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
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
