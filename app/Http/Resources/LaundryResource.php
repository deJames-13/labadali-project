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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'item_total' => $this->pivot->item_total ?? null,
            'quantity' => $this->pivot->quantity ?? null,
            'max_qty' => $this->max_qty,
            'max_kilo' => $this->max_kilo,
            'max_items' => $this->max_items,
            'turnaround_day' => $this->turnaround_day,
            'image_path' =>    $serverUrl . '/storage/' . $this->image_path,
        ];
    }
}
