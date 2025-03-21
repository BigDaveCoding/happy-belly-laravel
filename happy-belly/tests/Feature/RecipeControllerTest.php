<?php

namespace Tests\Feature;

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

    public function test_RecipeController_returns_correct_data()
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

}
