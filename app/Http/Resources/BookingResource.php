<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\DeliveryResource;
use App\Http\Resources\InventoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'customer_id' => $this->customer_id,
            'status' => $this->status,
            'total_price' => $this->total_price,
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'laundries' => LaundryResource::collection($this->whenLoaded('laundries')),
            'inventories' => InventoryResource::collection($this->whenLoaded('inventories')),
            // 'delivery' => new DeliveryResource(optional($this->whenLoaded('deliveries'))),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
