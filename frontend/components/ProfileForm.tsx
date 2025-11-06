"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import axios from "axios";
import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ProfileFormProps {
  user: { id: string; name?: string; email?: string };
}

// Validation schema
const profileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ProfileForm({ user }: ProfileFormProps) {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (values: { name: string; email: string }) => {
    setMessage(null);
    try {
      await axios.put(`${BACKEND_URL}/api/user/${user.id}`, values, {
        withCredentials: true,
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <Formik
        initialValues={{
          name: user.name || "",
          email: user.email || "",
        }}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Field
              name="name"
              as={Input}
              label="Name"
              placeholder="Enter your name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="email"
              as={Input}
              label="Email"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>

            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
