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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->foreignId('booking_id')->primary()->constrained('bookings')->onDelete('cascade');
            // standard:50, express:100, priority:200
            $table->string('shipping_type')->default('standard');
            $table->decimal('shipping_cost')->default(50);
            $table->date('delivered_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
