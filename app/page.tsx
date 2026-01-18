import { HeroSlider } from "@/components/home/hero-slider";
import { HeroShowcase } from "@/components/home/hero-showcase";
import { CategoriesSection } from "@/components/home/categories-section";
import { BentoGrid } from "@/components/home/bento-grid";
import { TrendingSection } from "@/components/home/trending-section";
import { DiscountBanner } from "@/components/home/discount-banner";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BrandStorySection } from "@/components/home/brand-story-section";
import { InstagramSection } from "@/components/home/instagram-section";

export default function Home() {
  return (
    <main>
      {/* Hero Slider - Full screen auto-play carousel */}
      <HeroSlider />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Trending Products - Hot picks */}
      <TrendingSection />

      {/* Featured Collection */}
      <BentoGrid />

      {/* Hero Product Showcase - Top selling products */}
      <HeroShowcase />

      {/* Discount Banner - Promotional offers */}
      <DiscountBanner />

      {/* Brand Story - Company values */}
      <BrandStorySection />

      {/* Testimonials - Customer reviews */}
      <TestimonialsSection />

      {/* Instagram Feed */}
      <InstagramSection />
    </main>
  );
}
