import React from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowUpDown, List } from "lucide-react";
import { BookmarkCard } from "./components/BookMarkCard";

const page = () => {
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
          <Button variant="outline">
            <ArrowUpDown className="mr-1 h-4 w-4" />
            Sort
          </Button>
          <Button variant="outline">
            <List className="mr-1 h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      <div className=" grid grid-cols-4 gap-4">
        <BookmarkCard
          title="ChatGPT"
          description="AI chatbot for conversational assistance."
          icon="/assets/icons/logo.svg"
          category="Ai Tools"
          layout="compact"
        />

        <BookmarkCard
          title="ChatGPT"
          description="AI chatbot for conversational assistance."
          icon="/assets/icons/logo.svg"
          category="Ai Tools"
          layout="compact"
        />
      </div>
    </div>
  );
};

export default page;
