import { ContactSection, CredentialsSection, ExperienceSection, ProjectsSection, SkillsSection } from "@/components/sections/index";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Loader } from "@/components/loader";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Loader />
      <div className="lg:flex lg:min-h-screen">
        <Nav />
        <div className="flex-1 lg:ml-64">
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1200px] flex flex-col gap-12 lg:gap-24">
              <Hero />
              
              <div className="flex flex-col gap-12 lg:gap-16 pb-24">
                <ExperienceSection />
                <ProjectsSection />
                <SkillsSection />

                <CredentialsSection />
                <ContactSection />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
