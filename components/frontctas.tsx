import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DrupalView } from "next-drupal";

interface FrontCtasProps {
  ctas: DrupalView;
}

const FrontCtas: React.FC<FrontCtasProps> = ({ ctas }) => {
  return (
    <div className="px-5 pt-5">
      <div className="sm:gap:4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {ctas.results.map((cta, index) => (
          <article
            key={index}
            className="rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-deep-fir-800 via-deep-fir-900 to-deep-fir-950
            px-2 py-2.5 sm:flex sm:flex-col"
          >
            <header>
              <h2 className="mb-1.5">
                <Link
                  href={cta.field_internal_link.uri.replace(/^internal:/, "")} // Removes "internal:"
                  className="font-bebas-neue text-4xl tracking-wide text-white shadow-black transition-all duration-200 text-shadow md:text-3xl xl:text-5xl"
                  passHref
                >
                  {cta.title}
                </Link>
              </h2>
            </header>
            <Link
              href={cta.field_internal_link.uri.replace(/^internal:/, "")} // Removes "internal:"
              passHref
            >
              <Image
                src={
                  cta.field_cta_image.field_media_image.image_style_uri
                    .image_800x600_webp
                }
                alt={
                  cta.field_cta_image.field_media_image.resourceIdObjMeta.alt ||
                  "Eagle Hill Equine"
                }
                width={800}
                height={600}
                sizes="(max-width: 768px) 25vw, (max-width: 1024px) 33vw, 25vw"
                quality={70}
                placeholder="blur"
                blurDataURL={
                  cta.field_cta_image.field_media_image.image_style_uri
                    .image_800x600_webp
                }
                className="h-auto w-full overflow-hidden rounded-lg transition-all duration-300 hover:opacity-80"
              />
            </Link>
            <section className="mt-3 px-1.5">
              <p className="text-base font-medium text-white shadow-black text-shadow-sm">
                {cta.field_cta_body}
              </p>
            </section>
            <footer className="mt-auto pt-4 text-center">
              <Link
                href={cta.field_internal_link.uri.replace(/^internal:/, "")} // Removes "internal:"
                passHref
                className="text-md mb-2 inline-block rounded-md bg-gradient-to-b from-deep-fir-700 to-deep-fir-800
                p-2 font-bold text-white shadow-black text-shadow-sm hover:from-deep-fir-800 hover:to-deep-fir-700"
              >
                {cta.field_internal_link.title}
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FrontCtas;
