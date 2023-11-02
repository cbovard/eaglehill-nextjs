import React from "react";
import Link from "next/link";
import { DrupalView } from "next-drupal";

interface SidebarProps {
  sidebarCtas: DrupalView;
}

const SidebarCtas: React.FC<SidebarProps> = ({ sidebarCtas }) => {
  return (
    <div className="flex flex-col gap-y-6">
      {sidebarCtas.results.map((cta, index) => (
        <article
          key={index}
          className="rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-deep-fir-800 via-deep-fir-900 to-deep-fir-950
          px-3 py-4"
        >
          <header>
            <h2>
              <Link
                href={cta.field_sidebar_cta_internal_link.uri.replace(
                  /^internal:/,
                  "",
                )} // Removes "internal:"
                className="font-bebas-neue text-3xl tracking-wide text-white shadow-black transition-all duration-200 text-shadow"
                passHref
              >
                {cta.title}
              </Link>
            </h2>
          </header>
          <section className="mt-3 ">
            <p className="text-sm font-medium text-white shadow-black text-shadow-sm">
              {cta.field_sidebar_cta_body}
            </p>
          </section>
          <footer className="mt-auto pt-4 text-center">
            <Link
              href={cta.field_sidebar_cta_internal_link.uri.replace(
                /^internal:/,
                "",
              )} // Removes "internal:"
              passHref
              className="inline-block rounded-md bg-gradient-to-b from-deep-fir-700 to-deep-fir-800 p-2
              text-sm font-bold text-white shadow-black text-shadow-sm hover:from-deep-fir-800 hover:to-deep-fir-700"
            >
              {cta.field_sidebar_cta_internal_link.title}
            </Link>
          </footer>
        </article>
      ))}
    </div>
  );
};

export default SidebarCtas;
