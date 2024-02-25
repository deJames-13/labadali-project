<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LaundryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'item_total' => $this->pivot->item_total ?? null,
            'quantity' => $this->pivot->quantity ?? null,
            'max_kilo' => $this->max_kilo,
            'max_items' => $this->max_items,
            'turnaround_day' => $this->turnaround_day,
            'image_path' => $this->image_path,
        ];
    }
}
