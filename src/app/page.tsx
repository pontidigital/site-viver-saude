import { HeroSection } from "@/components/sections/HeroSection";
import { BannerCarousel } from "@/components/sections/BannerCarousel";
import { WhyViverSection } from "@/components/sections/WhyViverSection";
import { PlansCarousel } from "@/components/sections/PlansCarousel";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <BannerCarousel />
      <HeroSection />
      <WhyViverSection />
      <PlansCarousel />
      <BenefitsGrid />
      <QuickAccessSection />
      <CTASection />
    </>
  );
}
