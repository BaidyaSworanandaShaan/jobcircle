import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
          Ready to Take the Next Step in Your Career?
        </h2>
        <p className="text-lg mb-8 text-gray-600">
          Join thousands of professionals who have found their dream jobs
          through JobPortal. Start your journey today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
