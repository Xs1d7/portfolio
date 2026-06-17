"use client";

import { ParticleBackgroundProvider } from "@/contexts/particle-background-context";
import { PanelMascotProvider } from "@/contexts/panel-mascot-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ParticleBackgroundProvider>
      <PanelMascotProvider>
        <Header />
        <div className="relative z-10 mx-auto w-full max-w-5xl isolate px-5 sm:px-6 lg:px-8">
          {children}
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl isolate px-5 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </PanelMascotProvider>
    </ParticleBackgroundProvider>
  );
}
