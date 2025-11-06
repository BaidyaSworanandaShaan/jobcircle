import React from "react";
import { Briefcase, Users, Zap } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="py-28 min-h-screen text-foreground">
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-balance">
              Connecting Talent with Opportunity
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We believe the right job match can transform careers and
              businesses. Our platform makes it simple for companies to find
              exceptional talent and for professionals to discover their next
              great opportunity.
            </p>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                To revolutionize the job search experience by creating a
                transparent, efficient, and human-centered platform where talent
                and opportunity meet seamlessly.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are committed to removing barriers in hiring and empowering
                both job seekers and employers to make informed decisions that
                lead to meaningful, long-term relationships.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Briefcase className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">For Job Seekers</h3>
                    <p className="text-sm text-muted-foreground">
                      Find roles that match your skills, values, and career
                      goals with detailed company insights.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">For Employers</h3>
                    <p className="text-sm text-muted-foreground">
                      Access a curated pool of qualified candidates and
                      streamline your hiring process.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Efficiency First</h3>
                    <p className="text-sm text-muted-foreground">
                      Smart matching algorithms save time and connect the right
                      people with the right roles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in honest communication and clear information so both
                parties can make confident decisions.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
              <p className="text-muted-foreground">
                We celebrate diversity and create opportunities for talent from
                all backgrounds and experiences.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously improve our platform with cutting-edge
                technology and user-centered design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
