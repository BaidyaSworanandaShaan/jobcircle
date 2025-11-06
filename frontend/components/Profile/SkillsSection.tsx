interface SkillsSectionProps {
  skills: string[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills?.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
