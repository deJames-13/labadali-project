<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
            'username' => 'required|string|min:6|max:32|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                'max:15',
                Password::min(8)->letters()->numbers()->symbols()
            ],
        ];
    }
}
