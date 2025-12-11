import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const navbarVariants = cva(
  "sticky top-4 max-w-6xl self-center mx-auto rounded-full z-50 p-1",
  {
    variants: {
      variant: {
        default: "bg-background/50 backdrop-blur-sm",
      },
    },
  }
);

export default function NavbarComponent({
  links,
  variant,
}: {
  links: { href: string; label: string; active: boolean }[];
} & VariantProps<typeof navbarVariants>) {
  return (
    <NavigationMenu className={cn(navbarVariants({ variant }))}>
      <NavigationMenuList>
        {links.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              href={item.href}
              aria-current={item.active ? "page" : "false"}
              data-active={item.active}
              className={cn(
                "rounded-full px-6 py-4 data-[active=true]:shadow-sm data-[active=true]:hover:shadow-sm text-center",
                "data-[active=true]:focus:bg-accent/80 data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/80 hover:bg-accent/60"
              )}
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
