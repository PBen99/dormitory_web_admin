export const getRoom = (origin) => {
  var setObj = new Set();
  var result = origin.results.reduce((areas, item) => {
    if (!setObj.has(item.area.id)) {
      setObj.add(item.area.id, item.area);
      areas.push({ ...item.area, rooms: [] });
    }
    return areas;
  }, []);

  result.forEach((area) => {
    origin.results.forEach((room) => {
      if (area.id === room.area.id) {
        area.rooms.push({
          created_at: room.created_at,
          id: room.id,
          last_update: room.last_update,
          name: room.name,
          number_now: room.number_now,
          slug: room.slug,
          status: room.status,
          typeroom: room.typeroom,
        });
      }
    });
  });
  return result;
};
