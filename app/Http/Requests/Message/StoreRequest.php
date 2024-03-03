<?php

namespace App\Http\Requests\Message;

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
            'sender_id' => 'required|integer|exists:users,id',
            'sender_type' => 'required',
            'recipient_id' => 'sometimes|integer|exists:users,id',
            'recipient_type' => 'sometimes',
            'content' => 'required|string'
        ];
    }
}
