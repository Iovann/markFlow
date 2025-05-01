"use client";

import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Laptop,
  Briefcase,
  Phone,
  DollarSign,
  Globe,
  Music,
  BookOpen,
  MessageSquare,
  BookMarked,
  Network,
  Camera,
  Mail,
  Gamepad2,
  Lightbulb,
  Key,
  Ban,
  Tv,
  Library,
} from "lucide-react";

// Interface pour les données de catégorie
interface CategoryData {
  name: string;
  icon: string;
  color: string;
}

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (categoryData: CategoryData) => Promise<void>;
}

export default function CreateCategoryModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateCategoryModalProps) {
  // États pour les entrées de formulaire
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Liste des icônes disponibles avec leur composant et nom
  const icons = [
    { component: <Laptop size={24} />, name: "laptop" },
    { component: <Briefcase size={24} />, name: "briefcase" },
    { component: <Phone size={24} />, name: "phone" },
    { component: <DollarSign size={24} />, name: "dollar" },
    { component: <Globe size={24} />, name: "globe" },
    { component: <Music size={24} />, name: "music" },
    { component: <BookOpen size={24} />, name: "book" },
    { component: <MessageSquare size={24} />, name: "message" },
    { component: <BookMarked size={24} />, name: "bookmarked" },
    { component: <Network size={24} />, name: "network" },
    { component: <Camera size={24} />, name: "camera" },
    { component: <Mail size={24} />, name: "mail" },
    { component: <Gamepad2 size={24} />, name: "gamepad" },
    { component: <Lightbulb size={24} />, name: "lightbulb" },
    { component: <Key size={24} />, name: "key" },
    { component: <Ban size={24} />, name: "ban" },
    { component: <Tv size={24} />, name: "tv" },
    { component: <Library size={24} />, name: "library" },
  ];

  // Palette de couleurs disponibles
  const colors = [
    { color: "#FF5252", name: "red" },
    { color: "#FF9800", name: "orange" },
    { color: "#FFD600", name: "yellow" },
    { color: "#4CAF50", name: "green" },
    { color: "#26A69A", name: "teal" },
    { color: "#2196F3", name: "blue" },
    { color: "#9C27B0", name: "purple" },
    { color: "#90A4AE", name: "grey" },
    { color: "#1A237E", name: "darkblue" },
  ];

  // Réinitialiser le formulaire
  const resetForm = () => {
    setCategoryName("");
    setSelectedIcon(null);
    setSelectedColor(null);
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async () => {
    if (!categoryName || !selectedIcon || !selectedColor) {
      return; // Validation basique
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: categoryName,
        icon: selectedIcon,
        color: selectedColor,
      });

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour vérifier si l'icône est sélectionnée
  const isIconSelected = (iconName: string) => selectedIcon === iconName;

  // Fonction pour vérifier si la couleur est sélectionnée
  const isColorSelected = (colorName: string) => selectedColor === colorName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 text-white border border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Add New Category
          </DialogTitle>
          <p className="text-zinc-400 mt-1">
            Create a new category to organize your bookmarks
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Nom de catégorie */}
          <div className="space-y-2">
            <label htmlFor="categoryName" className="block text-white">
              Category Name <span className="text-blue-500">*</span>
            </label>
            <Input
              id="categoryName"
              placeholder="Enter category name..."
              className="bg-zinc-800 border-zinc-700 text-white"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          {/* Sélection d'icône */}
          <div className="space-y-2">
            <label className="block text-white">Choose Icon</label>
            <div className="grid grid-cols-9 gap-2 p-2 rounded-md bg-zinc-800 border border-zinc-700">
              {icons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                    isIconSelected(icon.name)
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-700"
                  }`}
                  onClick={() => setSelectedIcon(icon.name)}
                >
                  {icon.component}
                </button>
              ))}
            </div>
          </div>

          {/* Sélection de couleur */}
          <div className="space-y-2">
            <label className="block text-white">Choose color</label>
            <div className="grid grid-cols-9 gap-2 p-2 rounded-md bg-zinc-800 border border-zinc-700">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-8 h-8 rounded-full transition-transform ${
                    isColorSelected(color.name)
                      ? "ring-2 ring-white scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:gap-0">
          <Button
            type="button"
            variant="default"
            className="w-full bg-white text-black hover:bg-zinc-200"
            onClick={handleSubmit}
            disabled={
              !categoryName || !selectedIcon || !selectedColor || isSubmitting
            }
          >
            Create Category
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-zinc-400 hover:text-white hover:bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
