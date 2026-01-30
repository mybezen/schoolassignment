<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function index(): Response
    {
        $payments = Payment::with('product')
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/payments/index', [
            'payments' => $payments,
        ]);
    }

    public function show(Payment $payment): Response
    {
        $payment->load('product');

        return Inertia::render('admin/payments/show', [
            'payment' => $payment,
        ]);
    }

    public function confirm(Payment $payment): RedirectResponse
    {
        if ($payment->status !== 'pending') {
            return redirect()->back()->with('error', 'Only pending payments can be confirmed.');
        }

        $payment->update([
            'status' => 'confirmed',
            'admin_reason' => null,
        ]);

        return redirect()->back()->with('success', 'Payment confirmed successfully.');
    }

    public function decline(Request $request, Payment $payment): RedirectResponse
    {
        if ($payment->status !== 'pending') {
            return redirect()->back()->with('error', 'Only pending payments can be declined.');
        }

        $request->validate([
            'admin_reason' => 'required|string|max:1000',
        ]);

        $payment->update([
            'status' => 'declined',
            'admin_reason' => $request->admin_reason,
        ]);

        return redirect()->back()->with('success', 'Payment declined.');
    }
}