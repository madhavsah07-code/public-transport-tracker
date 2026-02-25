import TransportCard from "./TransportCard";

function TransportList({ routes, onBook }) {
  if (routes.length === 0) {
    return <p>No transport available</p>;
  }

  const nextArrival = Math.min(...routes.map((r) => r.arrival));

  return (
    
  <div className="transport-grid">
    {routes.map((route) => (
      <TransportCard
        key={route.id}
        data={route}
        isNext={route.arrival === nextArrival}
        onBook={onBook}
      />
    ))}
  </div>
);
  
}

export default TransportList;