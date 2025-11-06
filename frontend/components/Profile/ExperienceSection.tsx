import { Experience } from "@/types/Profile";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
      <div className="mt-6 space-y-8">
        {experience?.map((exp, index: number) => (
          <div key={index} className="border-l-2 border-primary pl-4">
            <h3 className="font-semibold text-foreground">{exp.role}</h3>
            <p className="text-sm text-muted-foreground">{exp.company}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {exp.years} years
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
