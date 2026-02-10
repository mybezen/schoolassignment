<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Laravel Developer Meetup',
                'slug' => Str::slug('Laravel Developer Meetup'),
                'description' => 'Meetup developer Laravel se-Indonesia.',
                'content' => 'Acara ini membahas best practice Laravel, scaling, dan ecosystem terbaru.',
                'image' => 'events/seed1.jpg',
                'location' => 'Jakarta',
                'start_date' => now()->addDays(7),
                'end_date' => now()->addDays(7)->addHours(4),
                'is_active' => true,
            ],
            [
                'title' => 'Fullstack Web Workshop',
                'slug' => Str::slug('Fullstack Web Workshop'),
                'description' => 'Workshop intensif fullstack web development.',
                'content' => 'Belajar Laravel + React + Next.js langsung dari praktisi.',
                'image' => 'events/seed2.png',
                'location' => 'Bandung',
                'start_date' => now()->addDays(14),
                'end_date' => now()->addDays(15),
                'is_active' => true,
            ],
            [
                'title' => 'Tech Sharing Internal',
                'slug' => Str::slug('Tech Sharing Internal'),
                'description' => 'Sharing internal tim engineering.',
                'content' => 'Diskusi arsitektur, clean code, dan performance.',
                'image' => 'events/seed3.jpg',
                'location' => 'Bali',
                'start_date' => now()->subDays(3),
                'end_date' => now()->addDays(3),
                'is_active' => true,
            ],
        ];

        foreach ($events as $event) {
            DB::table('events')->insert([
                ...$event,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
