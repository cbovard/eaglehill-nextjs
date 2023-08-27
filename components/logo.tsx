import * as React from "react";
import Link from "next/link";
import siteConfig from "site.config";
import Image from "next/image";
import logoImage from "../public/images/logo.png";

export function Logo({ ...props }) {
  return (
    <Link href="/" passHref {...props}>
      <Image
        src={logoImage}
        alt={siteConfig.name}
        priority={true}
        placeholder="blur"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 100vw"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
