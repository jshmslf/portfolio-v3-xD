import { getApprovedTestimonials } from "@/lib/testimonials";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { SectionHeader } from "@/components/ui/section-header";

export async function Testimonials() {
  const testimonials = await getApprovedTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <SectionHeader title="Testimonials" />
      <div className="mt-6">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
