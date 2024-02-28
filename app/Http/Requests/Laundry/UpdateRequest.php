<?php

namespace App\Http\Requests\Laundry;

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

            "title" => 'string',
            "description" => 'string',
            "price" => 'numeric',
            "max_kilo" => 'numeric',
            "max_items" => 'numeric',
            "turnaround_day" => 'numeric',
            "image_path" => 'nullable|string',
        ];
    }
}
