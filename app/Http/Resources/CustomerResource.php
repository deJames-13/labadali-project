<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'address' => $this->address,
            'city' => $this->city,
            'region' => $this->region,
            'zip_code' => $this->zip_code,
            'image_path' => $this->image_path,
            'phone_number' => $this->phone_number,
            'birthdate' => $this->birthdate,
            'age' => $this->age,
            // messages
            'messages' => MessageResource::collection($this->whenLoaded('messages')),
        ];
    }
}
