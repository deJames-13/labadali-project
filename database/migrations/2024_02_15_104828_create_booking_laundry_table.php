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
        Schema::create('booking_laundry', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('laundry_id')->constrained('laundries')->onDelete('cascade');
            $table->decimal('item_total');
            $table->integer('quantity');
            $table->primary(['booking_id', 'laundry_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_laundry');
    }
};
