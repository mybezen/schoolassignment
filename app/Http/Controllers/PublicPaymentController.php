<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Payment;

class PublicPaymentController extends Controller
{
    public function store(StorePaymentRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('payment_proof')) {
            $data['payment_proof'] = $request->file('payment_proof')->store('payments', 'public');
        }

        $data['status'] = 'pending';

        Payment::create($data);

        return redirect()->back()->with('success', 'Payment submitted successfully. We will review your payment shortly.');
    }
}
