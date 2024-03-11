<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $serverUrl = config('app.url');
        $serverUrl .= $request->server('SERVER_PORT') == 80 ? '' : ':' . $request->server('SERVER_PORT');
        $image =  $this->image_path ? ($serverUrl . '/storage/' . $this->image_path) : '';
        return [
            "id" => $this->id,
            "item_name" => $this->item_name,
            "stock" => $this->stock,
            "tags" => $this->tags,
            "instructions" => $this->instructions,
            "image_path" => $image,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'quantity_used' => $this->whenPivotLoaded('booking_inventory', function () {
                return $this->pivot->quantity_used;
            }),


        ];
    }
}
