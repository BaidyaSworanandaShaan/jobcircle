import { Profile } from "@/types/Profile";

interface SocialLinksProps {
  profile: Profile;
}

export function SocialLinks({ profile }: SocialLinksProps) {
  const links = [
    { label: "Portfolio", url: profile?.portfolioURL, icon: "🔗" },
    { label: "LinkedIn", url: profile?.linkedinURL, icon: "💼" },
    { label: "GitHub", url: profile?.githubURL, icon: "💻" },
  ];

  return (
    <section className="border-t border-border pt-8 pb-8">
      <h2 className="text-2xl font-semibold text-foreground">Connect</h2>
      <div className="mt-4 flex flex-wrap gap-4">
        {links?.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
