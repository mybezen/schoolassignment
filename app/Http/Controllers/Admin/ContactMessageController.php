<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        $messages = ContactMessage::latest()->paginate(10);

        return Inertia::render('admin/contacts/index', [
            'messages' => $messages,
        ]);
    }

    public function show(ContactMessage $contactMessage): Response
    {
        // Mark as read
        if (!$contactMessage->is_read) {
            $contactMessage->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
        }

        return Inertia::render('admin/contacts/show', [
            'message' => $contactMessage,
        ]);
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Message deleted successfully.');
    }
}
