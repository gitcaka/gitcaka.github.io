import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type FullPageLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
>;

export function FullPageLink({ children, ...props }: FullPageLinkProps) {
  // oxlint-disable-next-line next/no-html-link-for-pages
  return <a {...props}>{children}</a>;
}
