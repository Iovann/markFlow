"use client";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

interface BookmarkFormData {
  url: string;
  name: string;
  description: string;
  category: string;
}

const Page = () => {
  const [formData, setFormData] = useState<BookmarkFormData>({
    url: "",
    name: "",
    description: "",
    category: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className='max-w-lg w-full rounded-2xl shadow border border-gray-700 p-4'>
        <div className="mb-6">
          <h1 className='text-lg md:text-xl 2xl:text-2xl font-semibold'>Add New Bookmark</h1>
          <p className="text-sm text-muted-foreground">
            Save a new bookmark to your collection
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="url" className="mb-2">URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="http://example.com"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="name" className="mb-2">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Bookmark name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2" >Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Brief description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <Label htmlFor="category" className="mb-2">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI Tools">AI Tools</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" type="submit">
            Save Bookmark
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
