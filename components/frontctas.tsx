import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DrupalView } from "next-drupal";

interface FrontCtasProps {
  ctas: DrupalView;
}

const FrontCtas: React.FC<FrontCtasProps> = ({ ctas }) => {
  return (
    <div className="px-5">
      <div className="grid grid-cols-2 gap-4 bg-black md:grid-cols-3 lg:grid-cols-4">
        {ctas.results.map((cta, index) => (
          <article key={index}>
            <header>
              <Link
                href={cta.field_internal_link.uri.replace(/^internal:/, "")} // Removes "internal:"
                passHref
                className="text-sm text-gray-400 transition-all hover:text-lime-500 hover:underline"
              >
                <h2>{cta.title}</h2>
              </Link>
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
                className="h-auto w-full overflow-hidden rounded-lg transition-all duration-300 hover:opacity-70"
              />
            </Link>
            <section>
              <p className="text-white">{cta.field_cta_body}</p>
            </section>
            <footer>
              <Link
                href={cta.field_internal_link.uri.replace(/^internal:/, "")} // Removes "internal:"
                passHref
                className="text-sm text-gray-400 transition-all hover:text-lime-500 hover:underline"
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
