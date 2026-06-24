<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('treatment_results')) {
            Schema::table('treatment_results', function (Blueprint $table) {
                if (!Schema::hasColumn('treatment_results', 'id_booking')) {
                    $table->foreignId('id_booking')
                        ->unique()
                        ->constrained('bookings', 'id_booking')
                        ->cascadeOnDelete();
                }

                if (!Schema::hasColumn('treatment_results', 'submitted_by')) {
                    $table->foreignId('submitted_by')
                        ->nullable()
                        ->constrained('users', 'id_user')
                        ->nullOnDelete();
                }

                if (!Schema::hasColumn('treatment_results', 'skin_condition')) {
                    $table->text('skin_condition');
                }

                if (!Schema::hasColumn('treatment_results', 'treatment_result')) {
                    $table->text('treatment_result');
                }

                if (!Schema::hasColumn('treatment_results', 'recommendation')) {
                    $table->text('recommendation');
                }

                if (!Schema::hasColumn('treatment_results', 'home_care')) {
                    $table->text('home_care');
                }

                if (!Schema::hasColumn('treatment_results', 'control_note')) {
                    $table->text('control_note');
                }

                if (!Schema::hasColumn('treatment_results', 'submitted_at')) {
                    $table->timestamp('submitted_at')->nullable();
                }
            });

            return;
        }

        Schema::create('treatment_results', function (Blueprint $table) {
            $table->id('id_treatment_result');
            $table->foreignId('id_booking')
                ->unique()
                ->constrained('bookings', 'id_booking')
                ->cascadeOnDelete();
            $table->foreignId('submitted_by')
                ->nullable()
                ->constrained('users', 'id_user')
                ->nullOnDelete();
            $table->text('skin_condition');
            $table->text('treatment_result');
            $table->text('recommendation');
            $table->text('home_care');
            $table->text('control_note');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treatment_results');
    }
};
