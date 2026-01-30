<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'product_id',
        'buyer_name',
        'buyer_phone',
        'buyer_email',
        'payment_method',
        'payment_proof',
        'status',
        'admin_reason',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}