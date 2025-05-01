import { Star, ExternalLink, Share2, Pencil, Trash } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";
import clsx from "clsx";

interface BookmarkCardProps {
  title: string;
  description: string;
  category: string;
  layout?: "compact" | "extended";
}

export const BookmarkCard = ({
  title,
  description,
  category,
  layout = "compact",
}: BookmarkCardProps) => {

  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all dark:bg-gradient-to-tl from-[#232323] to-[#515151]",
        layout === "extended"
          ? "flex items-center justify-between p-4"
          : "flex flex-col p-4 hover:border-primary"
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          layout === "extended" ? "flex items-center gap-4" : "absolute right-4 top-4"
        )}
      >
        <Image src='/assets/icons/logo.svg' alt="markFlow" width={40} height={40} className="rounded-sm" />
      </div>

      {/* Content */}
      <div className={clsx(layout === "extended" ? "flex-1" : "mt-12")}>
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Badge variant="secondary" className="mt-2 w-fit py-2 px-4">
          {category}
        </Badge>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 items-center justify-end">
        {layout === "extended" && (
          <Button variant="default" size="sm" className="flex items-center gap-1">
            Visit website <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        )}
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};
