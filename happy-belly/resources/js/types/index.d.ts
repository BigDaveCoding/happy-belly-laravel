import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    cooking_time: string;
    serves: number;
    user_id: number;
}

export interface Ingredient {
    id: number,
    name: string,
    food_group: string,
    allergen: boolean,
    pivot: {
        quantity: number,
        unit: string
    }
}
interface cookingInstructions {
    recipe_id: number,
    step: number,
    instruction: string,
}

export interface SingleRecipeIngredientsInstructions {
    id: number;
    name: string;
    description: string;
    image: string;
    cooking_time: string;
    ingredients: Ingredient[]
    cooking_instructions: cookingInstructions[]
}

export interface RecipeFormData {
    recipe_name: string;
    recipe_description: string;
    recipe_image: string;
    recipe_cooking_time: string;
    recipe_serves: string;
}
export interface IngredientFormData {
    ingredient_name: string;
    ingredient_quantity: string;
    ingredient_unit: string;
    ingredient_allergen: number;
}
