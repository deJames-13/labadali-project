<?php

namespace App\Http\Requests\Booking;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'laundries' => 'required|array',
            'laundries.*.item_total' => 'required|numeric|min:0',
            'laundries.*.quantity' => 'required|integer|min:1',
            'laundries.*.id' => Rule::exists('laundries', 'id'),
            'total_price' => 'required|numeric',
        ];
    }
}
