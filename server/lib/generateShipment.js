const getRandomShipments=(count = 4)=> {
  const statuses = ['Delivered', 'In Transit', 'Cancelled'];
  const shipments = [];
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const quantity = status === 'Cancelled' ? 0 : Math.floor(Math.random() * 31) + 10; // 10-40
    const date = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toISOString()
      .slice(0, 10);
    shipments.push({
      id: i.toString(),
      date,
      status,
      quantity,
    });
  }
  return shipments;
}

module.exports = {
  getRandomShipments,
}