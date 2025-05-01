"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import CreateCategoryModal from "./components/modal";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fonction pour gérer la soumission du formulaire
  const handleCreateCategory = async (categoryData: {
    name: string;
    icon: string;
    color: string;
  }) => {
    // Remplacez ceci par la logique de sauvegarde dans votre base de données
    console.log("Creating category:", categoryData);
    
    // Exemple d'appel API avec Supabase
    // const { data, error } = await supabase
    //   .from('categories')
    //   .insert([
    //     { 
    //       name: categoryData.name,
    //       icon: categoryData.icon,
    //       color: categoryData.color,
    //       user_id: userId
    //     }
    //   ]);
    
    // if (error) throw error;
    
    // Fermer le modal après la création
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Categories</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>
      
      {/* Liste des catégories existantes ici */}
      
      {/* Modal pour créer une nouvelle catégorie */}
      <CreateCategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
}