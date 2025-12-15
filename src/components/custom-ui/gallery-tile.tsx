import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type ImageSource =
  | string
  | {
      light: string;
      dark: string;
    };

export default function GalleryTile({
  images,
  altText,
  description,
  theme = "light",
  className,
  ...props
}: {
  images: {
    sm: ImageSource;
    lg: ImageSource;
  };
  altText: string;
  description?: string;
  theme?: "light" | "dark";
  className?: string;
} & React.ComponentProps<typeof DialogTrigger>) {
  const smImageSource =
    typeof images.sm === "string" ? images.sm : images.sm[theme];
  const lgImageSource =
    typeof images.lg === "string" ? images.lg : images.lg[theme];

  return (
    <Dialog>
      <DialogTrigger {...props}>
        <div
          className={cn(
            "relative aspect-video rounded-md bg-cover bg-center",
            className
          )}
        >
          <div
            style={{
              backgroundImage: `url(${smImageSource})`,
            }}
            className="absolute inset-0 bg-cover bg-center rounded-[inherit] blur-xs opacity-60"
          ></div>
          <img
            src={smImageSource}
            alt={altText}
            className="relative w-full h-full object-contain rounded-[inherit] drop-shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{altText}</DialogTitle>
          <DialogDescription className={cn({ "sr-only": !description })}>
            {description ?? altText}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <img
            src={lgImageSource}
            alt={altText}
            className="rounded-lg ring-2 ring-card max-h-[90vh] max-w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
