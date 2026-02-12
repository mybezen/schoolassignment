<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleries = [
            [
                'title' => 'Company Office',
                'image' => 'gallery/seed1.jpg',
                'caption' => 'Suasana kantor utama perusahaan',
                'category' => 'Office',
                'order' => 1,
            ],
            [
                'title' => 'Team Activity',
                'image' => 'gallery/seed2.jpg',
                'caption' => 'Kegiatan tim saat workshop internal',
                'category' => 'Team',
                'order' => 2,
            ],
            [
                'title' => 'Product Showcase',
                'image' => 'gallery/seed3.jpg',
                'caption' => 'Preview produk terbaru',
                'category' => 'Product',
                'order' => 3,
            ],
            [
                'title' => null,
                'image' => 'galleries/seed4.jpg',
                'caption' => null,
                'category' => null,
                'order' => 4,
            ],
        ];

        foreach ($galleries as $gallery) {
            DB::table('galleries')->insert([
                ...$gallery,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
