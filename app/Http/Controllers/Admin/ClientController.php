<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::latest()->paginate(10);

        return Inertia::render('admin/clients/index', [
            'clients' => $clients,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/clients/create');
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['logo'] = $request->file('logo')->store('clients', 'public');

        Client::create($data);

        return redirect()->route('admin.clients.index')
            ->with('success', 'Client created successfully.');
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('admin/clients/edit', [
            'client' => $client,
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $data = $request->validated();

        // HANYA proses logo jika benar-benar ada file baru yang diupload
        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada
            if ($client->logo) {
                Storage::disk('public')->delete($client->logo);
            }
            // Simpan logo baru
            $data['logo'] = $request->file('logo')->store('clients', 'public');
        }
        // Jika tidak ada file baru → kolom logo tidak diubah (tetap seperti semula)

        $client->update($data);

        return redirect()->route('admin.clients.index')
            ->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        Storage::disk('public')->delete($client->logo);
        $client->delete();

        return redirect()->route('admin.clients.index')
            ->with('success', 'Client deleted successfully.');
    }
}
