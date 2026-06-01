import { ContactSection, CredentialsSection, ExperienceSection, MindsetSection, ProjectsSection, SkillsSection, CurrentlyExploringSection } from "@/components/sections";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Loader } from "@/components/loader";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1200px] flex flex-col gap-12 lg:gap-24">
          <Hero />
          
          <div className="flex flex-col gap-12 lg:gap-16 pb-24">
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <CurrentlyExploringSection />
            <MindsetSection />
            <CredentialsSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
