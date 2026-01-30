<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('buyer_name');
            $table->string('buyer_phone');
            $table->string('buyer_email');
            $table->enum('payment_method', ['paypal', 'visa', 'qris']);
            $table->string('payment_proof');
            $table->enum('status', ['pending', 'confirmed', 'declined'])->default('pending');
            $table->text('admin_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
