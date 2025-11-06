"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { contactUsSchema } from "@/lib/validationSchemas";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enquiry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      resetForm();

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error: unknown) {
      // Type-safe error handling
      if (error instanceof Error) {
        console.error("Error sending enquiry:", error.message);
        alert(`Something went wrong: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-28">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            We would love to hear from you. Send us a message and we will
            respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={contactUsSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <Field
                        name="name"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Field
                        name="subject"
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      />
                      <ErrorMessage
                        name="subject"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white rounded-lg px-8 py-3 hover:bg-blue-700 transition-colors font-semibold shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" /> Send Message
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Email</h3>
                <p className="mt-1 text-muted-foreground">
                  support@jobportal.com
                </p>
                <p className="text-muted-foreground">hello@jobportal.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-50">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-50">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Address
                </h3>
                <p className="mt-1 text-muted-foreground">123 Job Street</p>
                <p className="text-muted-foreground">San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
