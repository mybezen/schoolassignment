<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = [
            [
                'name' => 'Google',
                'logo' => 'clients/seed1.png',
                'website' => 'https://google.com',
                'description' => 'Technology and software company.',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Microsoft',
                'logo' => 'clients/seed2.png',
                'website' => 'https://microsoft.com',
                'description' => 'Enterprise software and cloud services.',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Amazon Web Services',
                'logo' => 'clients/seed3.jpg',
                'website' => 'https://aws.amazon.com',
                'description' => 'Cloud computing platform.',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Meta',
                'logo' => 'clients/seed4.jpg',
                'website' => 'https://about.meta.com',
                'description' => 'Social media and software technology company.',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Netflix',
                'logo' => 'clients/seed5.jpg',
                'website' => 'https://netflix.com',
                'description' => 'Streaming platform powered by software & cloud.',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'GitHub',
                'logo' => 'clients/seed6.png',
                'website' => 'https://github.com',
                'description' => 'Platform for software development collaboration.',
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($clients as $client) {
            DB::table('clients')->insert([
                ...$client,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
