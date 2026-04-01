"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { createClient } from "@/lib/supabase/client";

interface Banner {
  id: string;
  title: string;
  image_url: string;
  image_mobile_url: string | null;
  link_url: string | null;
  link_target: string;
  alt_text: string | null;
}

export function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  useEffect(() => {
    async function fetchBanners() {
      const supabase = createClient();
      const { data } = await supabase
        .from("banners")
        .select("id, title, image_url, image_mobile_url, link_url, link_target, alt_text")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (data && data.length > 0) setBanners(data);
    }
    fetchBanners();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi || banners.length <= 1) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi, banners.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full bg-gray-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => {
            const content = (
              <div className="relative w-full aspect-[21/9] md:aspect-[21/7] flex-none min-w-0 basis-full">
                {/* Desktop image */}
                <Image
                  src={banner.image_url}
                  alt={banner.alt_text || banner.title}
                  fill
                  className="object-cover hidden md:block"
                  sizes="100vw"
                  priority
                />
                {/* Mobile image (fallback to desktop) */}
                <Image
                  src={banner.image_mobile_url || banner.image_url}
                  alt={banner.alt_text || banner.title}
                  fill
                  className="object-cover md:hidden"
                  sizes="100vw"
                  priority
                />
              </div>
            );

            if (banner.link_url) {
              return (
                <Link
                  key={banner.id}
                  href={banner.link_url}
                  target={banner.link_target || "_self"}
                  className="flex-none min-w-0 basis-full"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={banner.id} className="flex-none min-w-0 basis-full">
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Banner anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Próximo banner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-white w-7"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Ir para banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
