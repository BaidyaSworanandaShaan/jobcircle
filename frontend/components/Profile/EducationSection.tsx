import { Education } from "@/types/Profile";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-2xl font-semibold text-foreground">Education</h2>
      <div className="mt-6 space-y-6">
        {education?.map((edu, index: number) => (
          <div key={index} className="border-l-2 border-primary pl-4">
            <h3 className="font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-sm text-muted-foreground">{edu.institution}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDate(edu.year)}{" "}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
