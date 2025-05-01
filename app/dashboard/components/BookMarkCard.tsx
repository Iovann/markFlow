import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";

type BookmarkCardProps = {
  title: string;
  description: string;
  iconUrl: string;
  category: string;
};

export default function BookmarkCard({
  title,
  description,
  iconUrl,
  category,
}: BookmarkCardProps) {
  return (
    <Card className="bg-muted/40 border-none shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <Image src={iconUrl} alt={title} width={32} height={32} className="rounded-md" />
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
        <span className="text-xs font-medium bg-secondary px-2 py-0.5 w-fit rounded">
          {category}
        </span>
      </CardContent>
    </Card>
  );
}
