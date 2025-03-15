import {render, screen} from "@testing-library/react";
import RecipeDataMap from "@/components/recipe-data-map";
import { Recipe} from "@/types";

describe('RecipeDataMap', () => {
    const mockRecipeData: Recipe[] = [
        {
            id: 1,
            name: 'recipe 1',
            description: 'description 1',
            image: 'https://placehold.co/600x400',
            cooking_time: '10',
            serves: 2,
            user_id: 1
        }, {
            id: 2,
            name: 'recipe 2',
            description: 'description 2',
            image: 'https://placehold.co/600x400',
            cooking_time: '20',
            serves: 4,
            user_id: 2
        }
    ];

    test('renders without crashing', () => {
        render(<RecipeDataMap recipeData={mockRecipeData} />)
    });

    test('displaying correct info from property', () => {
        render(<RecipeDataMap recipeData={mockRecipeData} />)
        expect(screen.getByText('recipe 1')).toBeInTheDocument();
        expect(screen.getByText('recipe 2')).toBeInTheDocument();
        expect(screen.getByText('Cooking Time: 10 minutes')).toBeInTheDocument();
        expect(screen.getByText('Cooking Time: 20 minutes')).toBeInTheDocument();
        expect(screen.getByText('Serves 2')).toBeInTheDocument();
        expect(screen.getByText('Serves 4')).toBeInTheDocument();
    });

    test('displays correct info if property is empty array', () => {
        render(<RecipeDataMap recipeData={[]} />)
        expect(screen.getByText('No recipes found.')).toBeInTheDocument();
    });

    test('image attributes (src, alt) are correct', () => {
        const { container } = render(<RecipeDataMap recipeData={mockRecipeData} />)
        const images = container.querySelectorAll('img')
        let index = 0
        images.forEach(image => {
            expect(image).toHaveAttribute('src', mockRecipeData[index].image)
            expect(image).toHaveAttribute('alt', mockRecipeData[index].name)
            index++
        });
    });

    test('Link href attribute is correct', () => {
        const { container } = render(<RecipeDataMap recipeData={mockRecipeData}/>)
        const links = container.querySelectorAll('Link')
        let index = 0
        links.forEach(link => {
            expect(link).toHaveAttribute('href', `/singleRecipe/${mockRecipeData[index].id}`)
            index++
        })
    })
});
