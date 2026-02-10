<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Premium Website',
                'slug' => Str::slug('Premium Website'),
                'description' => 'Dynamic website development',
                'content' => 'Cocok untuk company profile, startup, dan landing page.',
                'image' => 'products/seed1.jpg',
                'price' => 255,
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Mobile App Development',
                'slug' => Str::slug('Mobile App Development'),
                'description' => 'Mobile app development with Flutter & React Native',
                'content' => 'Sudah include auth, state management, dan API setup.',
                'image' => 'products/seed2.png',
                'price' => 336,
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Custom Software Development',
                'slug' => Str::slug('Custom Software Development'),
                'description' => 'Custom software development',
                'content' => 'Web, mobile, dan enterprise solution.',
                'image' => 'products/seed3.jpg',
                'price' => null,
                'is_active' => true,
                'order' => 3,
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                ...$product,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
