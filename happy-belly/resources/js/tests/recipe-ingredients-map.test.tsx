import { render, screen } from '@testing-library/react'
import RecipeIngredientsMap from "@/components/recipe-ingredients-map";
import { Ingredient } from "@/types";

describe('RecipeIngredientsMap', () => {
    const mockIngredients: Ingredient[] = [
        {
            id: 1,
            name: 'Tomato',
            food_group: 'group',
            allergen: true,
            pivot: { quantity: 3, unit: 'pieces' }
        },
        {
            id: 2,
            name: 'Onion',
            food_group: 'veg',
            allergen: true,
            pivot: { quantity: 1, unit: 'piece' }
        },
    ];

    test('renders the ingredients correctly', () => {
        // Render the RecipeIngredientsMap component with mock data
        render(<RecipeIngredientsMap ingredients={mockIngredients} />);

        // Assert that the ingredient names and quantities are rendered correctly
        expect(screen.getByText('Tomato - 3 pieces')).toBeInTheDocument();
        expect(screen.getByText('Onion - 1 piece')).toBeInTheDocument();
    });

    test('renders the ingredients in a list', () => {
        render(<RecipeIngredientsMap ingredients={mockIngredients} />);

        // Assert that the number of list items is equal to the number of ingredients
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(mockIngredients.length);
    });
});
