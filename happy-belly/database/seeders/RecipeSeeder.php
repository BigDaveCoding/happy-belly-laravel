<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('recipes')->insert([
                'name' => fake()->words(2, true),
                'description' => fake()->words(20, true),
                'image' => 'https://placehold.co/600x400',
                'cooking_time' => fake()->time('i')
            ]);
        }
    }
}
