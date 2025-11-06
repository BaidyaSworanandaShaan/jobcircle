"use client";

import {
  Formik,
  Form,
  FieldArray,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { profileSchema } from "@/lib/validationSchemas";
import { User } from "@/types/Profile";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface ProfileDetailFormProps {
  user: User | null;
}
const ProfileDetailForm = ({ user }: ProfileDetailFormProps) => {
  const router = useRouter();
  const { accessToken } = useAuth();

  const initialValues = {
    firstName: user?.profile?.firstName || "",
    lastName: user?.profile?.lastName || "",
    phone: user?.profile?.phone || "",
    address: user?.profile?.address || "",
    city: user?.profile?.city || "",
    country: user?.profile?.country || "",
    bio: user?.profile?.bio || "",
    dateOfBirth: user?.profile?.dateOfBirth
      ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user?.profile?.gender || "",
    education: user?.profile?.education?.length
      ? user.profile.education
      : [{ degree: "", institution: "", year: "" }],
    experience: user?.profile?.experience?.length
      ? user.profile.experience
      : [{ company: "", role: "", years: "" }],
    skills: user?.profile?.skills?.length ? user.profile.skills : [""],
    portfolioURL: user?.profile?.portfolioURL || "",
    linkedinURL: user?.profile?.linkedinURL || "",
    githubURL: user?.profile?.githubURL || "",
  };

  console.log(initialValues);
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/profile/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving profile:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-28">
      <h1 className="text-2xl font-semibold">Complete Your Profile</h1>
      <p className="text-gray-600 text-md mb-5">
        Fill in the details below to enhance your job application profile.
      </p>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-md text-gray-700 border-b pb-2">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="firstName" label="First Name" placeholder="John" />
                <Input name="lastName" label="Last Name" placeholder="Doe" />
                <Input
                  name="phone"
                  label="Phone"
                  placeholder="+9779800000000"
                />
                <Input
                  name="address"
                  label="Address"
                  placeholder="123 Street"
                />
                <Input name="city" label="City" placeholder="Kathmandu" />
                <Input name="country" label="Country" placeholder="Nepal" />
                <Input name="dateOfBirth" label="Date of Birth" type="date" />
                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    id="bio"
                    name="bio"
                    placeholder="Short bio..."
                    className="w-full border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
                Education
              </h2>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.education.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
                      >
                        <Input
                          name={`education[${index}].degree`}
                          label="Degree"
                          placeholder="BSc in CS"
                        />
                        <Input
                          name={`education[${index}].institution`}
                          label="Institution"
                          placeholder="College Name"
                        />
                        <Input
                          name={`education[${index}].year`}
                          label="Year"
                          type="number"
                          placeholder="2024"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 p-2 rounded hover:bg-red-50"
                        >
                          <TrashIcon size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({ degree: "", institution: "", year: "" })
                      }
                      className="flex items-center text-blue-500 font-medium gap-1"
                    >
                      <PlusCircleIcon size={18} /> Add Education
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Experience */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
                Experience
              </h2>
              <FieldArray name="experience">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.experience.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
                      >
                        <Input
                          name={`experience[${index}].company`}
                          label="Company"
                          placeholder="Company Name"
                        />
                        <Input
                          name={`experience[${index}].role`}
                          label="Role"
                          placeholder="Role"
                        />
                        <Input
                          name={`experience[${index}].years`}
                          label="Years"
                          type="number"
                          placeholder="1"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 p-2 rounded hover:bg-red-50"
                        >
                          <TrashIcon size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ company: "", role: "", years: "" })}
                      className="flex items-center text-blue-500 font-medium gap-1"
                    >
                      <PlusCircleIcon size={18} /> Add Experience
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
                Skills
              </h2>
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <div className="space-y-2">
                    {values.skills.map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          name={`skills[${index}]`}
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

            {/* Links */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
                Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="portfolioURL"
                  label="Portfolio URL"
                  placeholder="https://portfolio.com"
                />
                <Input
                  name="linkedinURL"
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/username"
                />
                <Input
                  name="githubURL"
                  label="GitHub URL"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileDetailForm;
