<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGalleryRequest;
use App\Http\Requests\UpdateGalleryRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Gallery;
use App\Models\Client;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

// app/Http/Controllers/Admin/GalleryController.php
class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::latest()->paginate(12);

        return Inertia::render('admin/gallery/index', [
            'galleries' => $galleries,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/gallery/create');
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['image'] = $request->file('image')->store('gallery', 'public');

        Gallery::create($data);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item created successfully.');
    }

    public function edit(Gallery $gallery): Response
    {
        return Inertia::render('admin/gallery/edit', [
            'gallery' => $gallery,
        ]);
    }

    public function update(UpdateGalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $data = $request->validated();

        // HANYA proses image jika benar-benar ada file baru yang diupload
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            Storage::disk('public')->delete($gallery->image);
            // Simpan gambar baru
            $data['image'] = $request->file('image')->store('gallery', 'public');
        }
        // Jika tidak ada file baru → kolom image tidak diubah (tetap seperti semula)

        $gallery->update($data);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item updated successfully.');
    }
    public function destroy(Gallery $gallery): RedirectResponse
    {
        Storage::disk('public')->delete($gallery->image);
        $gallery->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item deleted successfully.');
    }
}
