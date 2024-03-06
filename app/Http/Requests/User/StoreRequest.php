<?php

namespace App\Http\Requests\User;

use Illuminate\Validation\Rules\Password;
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
            'username' => 'string|regex:/^\S*$/|unique:users,username,' . auth()->user()->id,
            'email' => 'string|email|unique:users,email,' . auth()->user()->id,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'zip_code' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'age' => 'required|integer|min:0',
            'image' => 'nullable',
            'role' => 'sometimes|string',
            'position' => 'sometimes|string',
            'phone_number' => 'string',
            'password' => [
                'sometimes',
                'confirmed',
                'max:15',
                Password::min(8)->letters()->numbers()->symbols()
            ],
        ];
    }
}
