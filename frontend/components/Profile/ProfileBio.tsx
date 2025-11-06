interface ProfileBioProps {
  bio: string;
}

export function ProfileBio({ bio }: ProfileBioProps) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-2xl font-semibold text-foreground">About</h2>
      <p className="mt-4 leading-relaxed text-foreground">{bio}</p>
    </section>
  );
}
