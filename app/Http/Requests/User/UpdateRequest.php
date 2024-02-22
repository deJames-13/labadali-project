<?php

namespace App\Http\Requests\User;

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
            'username' => 'string|regex:/^\S*$/|unique:users,username,' . auth()->user()->id,
            'email' => 'string|email|unique:users,email,' . auth()->user()->id,
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'address' => 'string|max:255',
            'city' => 'string|max:255',
            'region' => 'nullable|string|max:255',
            'zip_code' => 'string|max:255',
            'birthdate' => 'date',
            'age' => 'integer|min:0',
            'image' => 'nullable',
        ];
    }
}
