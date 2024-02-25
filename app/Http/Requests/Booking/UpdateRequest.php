<?php

namespace App\Http\Requests\Booking;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'laundries' => 'array',
            'laundries[*]' => ['array', Rule::exists('laundries', 'id')],
            'laundries.*.item_total' => 'numeric|min:0',
            'laundries.*.quantity' => 'integer|min:1',
            'laundries.*.laundry_id' => 'integer|min:1',
            'total_price' => 'numeric',
            'status' => 'string'
        ];
    }
}
