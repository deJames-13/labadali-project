export default function LaundryInventoryItem({ ...item }) {
  return (
    <div className="w-full  p-1">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src="/img/samplelaundry.jpg" alt="..." />
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <div>
            <div className="font-bold">{item.item_name}</div>
            <p className="text-xs">Stock: {item.stock}L</p>
          </div>
          <div>
            <div className="font-bold">Used cups</div>
            <p className="font-bold text-xs">
              in ml: {parseInt(item.quantity_used)}mL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
