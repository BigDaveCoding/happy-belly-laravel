<?php

namespace Tests\Feature;

use App\Models\CookingInstruction;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;
use Webmozart\Assert\Assert;

class RecipeControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use DatabaseMigrations;
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_RecipeController_returnsCorrectAdminData() : void
    {
        $user = User::factory()->create(); // Create and log in user
        $recipe = Recipe::factory()->create(['user_id' => $user->id]);
        $this->actingAs($user);

        $response = $this->get('/recipes');

        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('adminRecipes', 1, function (AssertableInertia $data) {
                $data->hasAll('id', 'name', 'description', 'image', 'cooking_time', 'serves', 'user_id');
            })
            ->has('userRecipes', 1, function (AssertableInertia $data) {
                $data->hasAll('id', 'name', 'description', 'image', 'cooking_time', 'serves', 'user_id');
            })
            ->where('userId', $user->id)
        );
    }

    public function test_RecipeController_returnsCorrectUserData() : void
    {
        $adminUser = User::factory()->create(['id' => 1]);

        $user = User::factory()->create();
        $user->id = 2;
        $user->save();

        $adminRecipe = Recipe::factory()->create(['user_id' => $adminUser->id]);
        $userRecipeOne = Recipe::factory()->create(['user_id' => $user->id]);
        $userRecipeTwo = Recipe::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->get('/recipes');
        $response->assertInertia(function (AssertableInertia $page) {
            $page->has('adminRecipes', 1);
            $page->has('userRecipes', 2, function (AssertableInertia $data) {
                $data->hasAll('id', 'name', 'description', 'image', 'cooking_time', 'serves', 'user_id');
            });
            $page->has('userId');
        });
    }

    public function test_RecipeController_singleRecipePage_returnsCorrectData() : void
    {
        $user = User::factory()->create(['id' => 1]);
        $recipe = Recipe::factory()->create(['id' => 1]);
        $ingredient = Ingredient::factory()->create();
        $recipe->ingredients()->attach($ingredient->id, ['quantity' => 1, 'unit' => 'g']);
        $cookingInstructions = CookingInstruction::factory()->create(['recipe_id' => $recipe->id]);

        $this->actingAs($user);

        $response = $this->get('/singleRecipe/1');
        $response->assertInertia(function (AssertableInertia $page) {
            $page->has('recipe', function (AssertableInertia $data) {
                $data->hasAll('id',
                    'cooking_instructions',
                    'cooking_time',
                    'description',
                    'image',
                    'ingredients',
                    'name',
                    'serves',
                    'user_id' )
                        ->has('ingredients', 1, function (AssertableInertia $ingredients) {
                            $ingredients->hasAll('id', 'allergen', 'food_group', 'name', 'pivot')
                                ->has('pivot', function (AssertableInertia $pivot) {
                                    $pivot->hasAll('quantity', 'unit')->etc();
                                });
                        })
                        ->has('cooking_instructions', 1, function (AssertableInertia $cookingInstructions) {
                            $cookingInstructions->hasAll('recipe_id', 'step', 'instruction');
                        });
            });
        });
    }

}
