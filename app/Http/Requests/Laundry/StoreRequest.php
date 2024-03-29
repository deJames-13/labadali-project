<?php

namespace App\Http\Requests\Laundry;

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
            "title" => 'required|string',
            "description" => 'required|string',
            "price" => 'required|numeric',
            "min_kilos" => 'required|numeric',
            "detergent_per_kilo" => 'required|numeric',
            "turnaround_day" => 'required|numeric',
            "image_path" => 'string',
        ];
    }
}
