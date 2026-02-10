<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Membangun Web Modern dengan Laravel',
                'slug' => Str::slug('Membangun Web Modern dengan Laravel'),
                'excerpt' => 'Panduan singkat membangun web modern menggunakan Laravel.',
                'content' => 'Laravel adalah framework PHP yang powerful untuk membangun aplikasi web modern...',
                'thumbnail' => 'articles/seed1.png',
                'author' => 'Amri Ikhda',
                'published_at' => now(),
                'is_published' => true,
            ],
            [
                'title' => 'Next.js untuk Fullstack Developer',
                'slug' => Str::slug('Next.js untuk Fullstack Developer'),
                'excerpt' => 'Kenapa Next.js jadi pilihan utama fullstack developer.',
                'content' => 'Next.js menawarkan SSR, SSG, dan DX yang sangat baik...',
                'thumbnail' => 'articles/seed2.png',
                'author' => 'Amri Ikhda',
                'published_at' => now(),
                'is_published' => true,
            ],
            [
                'title' => 'Tips Scaling Aplikasi Flutter',
                'slug' => Str::slug('Tips Scaling Aplikasi Flutter'),
                'excerpt' => 'Beberapa tips untuk scaling aplikasi Flutter ke production.',
                'content' => 'Untuk scaling Flutter, kamu perlu memperhatikan performance, memory usage, dan optimization...',
                'thumbnail' => 'articles/seed3.png',
                'author' => 'Amri Ikhda',
                'published_at' => now(),
                'is_published' => true,
            ],
        ];

        foreach ($articles as $article) {
            DB::table('articles')->insert([
                ...$article,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
