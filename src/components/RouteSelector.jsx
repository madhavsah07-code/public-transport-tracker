function RouteSelector({ routes, selectedRoute, setSelectedRoute }) {
  const uniqueRoutes = [...new Set(routes.map((r) => r.route))];

  return (
    <select
      value={selectedRoute}
      onChange={(e) => setSelectedRoute(e.target.value)}
    >
      <option value="">All Routes</option>
      {uniqueRoutes.map((route, index) => (
        <option key={index} value={route}>
          Route {route}
        </option>
      ))}
    </select>
  );
}

export default RouteSelector;