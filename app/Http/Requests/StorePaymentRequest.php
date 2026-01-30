<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'buyer_name' => 'required|string|max:255',
            'buyer_phone' => 'required|string|max:20',
            'buyer_email' => 'required|email|max:255',
            'payment_method' => 'required|in:paypal,visa,qris',
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'Product selection is required.',
            'product_id.exists' => 'Selected product does not exist.',
            'buyer_name.required' => 'Your name is required.',
            'buyer_phone.required' => 'Your phone number is required.',
            'buyer_email.required' => 'Your email is required.',
            'buyer_email.email' => 'Please provide a valid email address.',
            'payment_method.required' => 'Please select a payment method.',
            'payment_method.in' => 'Invalid payment method selected.',
            'payment_proof.required' => 'Payment proof is required.',
            'payment_proof.image' => 'Payment proof must be an image.',
            'payment_proof.mimes' => 'Payment proof must be jpeg, png, jpg, or webp.',
            'payment_proof.max' => 'Payment proof must not exceed 2MB.',
        ];
    }
}
