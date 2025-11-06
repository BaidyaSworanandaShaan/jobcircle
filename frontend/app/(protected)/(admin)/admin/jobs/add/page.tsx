"use client";

import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikHelpers,
} from "formik";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { jobAddSchema } from "@/lib/validationSchemas";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AddJobForm = () => {
  const router = useRouter();
  const { accessToken, user } = useAuth();

  const initialValues = {
    title: "",
    company: "",
    description: "",
    location: "",
    jobType: "",
    skillsRequired: [""],
    experience: "",
    salaryRange: "",
    dueDate: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    if (!accessToken) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: user?.id, ...values }),
      });

      if (!res.ok) throw new Error("Failed to add job");

      alert("Job added successfully!");
      router.push("/admin/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-2xl font-semibold mb-6">Add New Job</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={jobAddSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-8">
            {/* Job Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="title"
                  label="Job Title"
                  placeholder="Frontend Developer"
                />
                <Input
                  name="company"
                  label="Company"
                  placeholder="Company Name"
                />
                <Input
                  name="location"
                  label="Location"
                  placeholder="City, Country"
                />
                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Job Type
                  </label>
                  <Field
                    as="select"
                    name="jobType"
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Job Type</option>
                    <option value="FULL_TIME">Full-Time</option>
                    <option value="PART_TIME">Part-Time</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="REMOTE">Remote</option>
                  </Field>
                  <ErrorMessage
                    name="jobType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <Input
                  name="experience"
                  label="Experience"
                  placeholder="2 years"
                />
                <Input
                  name="salaryRange"
                  label="Salary Range"
                  placeholder="10k-20k"
                />
                <Input
                  name="dueDate"
                  label="Application Deadline"
                  type="date"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Job description..."
                  className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
                Skills Required
              </h2>
              <FieldArray name="skillsRequired">
                {({ push, remove }) => (
                  <div className="space-y-2">
                    {values.skillsRequired.map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          name={`skillsRequired[${index}]`}
                          placeholder="JavaScript"
                          label={`Skill ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 p-1 rounded hover:bg-red-50"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="flex items-center text-blue-500 font-medium gap-1"
                    >
                      <PlusCircleIcon size={18} /> Add Skill
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {isSubmitting ? "Adding..." : "Add Job"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddJobForm;
