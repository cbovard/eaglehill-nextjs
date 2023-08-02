import classNames from "classnames";
import { BreadcrumbsProps, Breadcrumbs } from "components/breadcrumbs";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  breadcrumbs?: BreadcrumbsProps["items"];
}

export function PageHeader({
  heading,
  breadcrumbs,
  children,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={classNames("container", className)} {...props}>
      {/* {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null} */}
      <div
        className={classNames(
          "text-text flex items-center py-10",
          children ? "justify-between" : "justify-center",
        )}
      >
        <h1 className="max-w-4xl text-center font-serif text-2xl md:text-5xl lg:text-4xl">
          {heading}
        </h1>
        {children}
      </div>
    </div>
  );
}
