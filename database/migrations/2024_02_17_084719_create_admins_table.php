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
        Schema::create('admins', function (Blueprint $table) {
            $table->foreignId('id')->primary()->constrained('users')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->string('position');
            $table->string('city');
            $table->string('region')->nullable();
            $table->string('zip_code');
            $table->string('image_path')->nullable();
            $table->string('phone_number');
            $table->date('birthdate');
            $table->integer('age');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_booking');
        Schema::dropIfExists('admins');
    }
};
