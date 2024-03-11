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
        $serverUrl = config('app.url');
        $serverUrl .= $request->server('SERVER_PORT') == 80 ? '' : ':' . $request->server('SERVER_PORT');
        $image =  $this->image_path ? ($serverUrl . '/storage/' . $this->image_path) : '';
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'item_total' => $this->pivot->item_total ?? null,
            'quantity' => $this->pivot->quantity ?? null,
            'min_kilos' => $this->min_kilos,
            'detergent_per_kilo' => $this->detergent_per_kilo,
            'turnaround_day' => $this->turnaround_day,
            'image_path' => $image,
        ];
    }
}
