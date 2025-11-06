import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/modern-office-collaboration.png"
              alt="About JobPortal"
              fill
              className="object-cover"
              priority
            />
          </div>{" "}
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Job Circle</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are on a mission to connect talented professionals with their
              dream careers. Our platform brings together job seekers and top
              employers, making the hiring process seamless and efficient.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With advanced search capabilities, personalized recommendations,
              and a vast network of companies, we help you find opportunities
              that match your skills, experience, and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  Learn More
                </button>
              </Link>

              <Link href="/contact">
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
