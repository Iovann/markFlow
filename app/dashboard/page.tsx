"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowUpDown, List } from "lucide-react";
import { BookmarkCard } from "./components/BookMarkCard";
import { bookmarksData } from "./components/utils/bookmarks";

const Page = () => {
  const [layout, setLayout] = useState<"compact" | "extended">("compact");
  const [sortAsc, setSortAsc] = useState(true);

  const sortedData = [...bookmarksData].sort((a, b) => {
    return sortAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Home</h1>
          <p className="text-sm text-muted-foreground">
            Effortless Bookmark Management
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSortAsc((prev) => !prev)}
          >
            <ArrowUpDown className="mr-1 h-4 w-4" />
            Sort
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setLayout((prev) => (prev === "compact" ? "extended" : "compact"))
            }
          >
            <List className="mr-1 h-4 w-4" />
            {layout === "compact" ? "List" : "Grid"}
          </Button>
        </div>
      </div>

      <div
        className={`grid ${
          layout === "compact" ? "grid-cols-4" : "grid-cols-1"
        } gap-4`}
      >
        {sortedData.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            title={bookmark.title}
            description={bookmark.description}
            category={bookmark.category}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
