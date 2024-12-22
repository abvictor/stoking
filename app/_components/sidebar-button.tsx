"use client"

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";


interface SidebarButtonProps {
    children: React.ReactNode;
    href: string;
}

const SidebarButton = ({ href, children }: SidebarButtonProps) => {
  const pathName = usePathname();

  return (
    <Button
      variant={pathName === href ? "default" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton