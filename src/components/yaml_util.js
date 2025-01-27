const roomsToYaml = (rooms, levels) => {
  let bounds = {
    min: { x: Number.MAX_VALUE, y: Number.MAX_VALUE, z: 0 },
    max: { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY},
  };

  // Update bounds (Currently assumes bounds cover all levels the same)
  Object.entries(rooms).forEach(([id, room]) => {
    room.points.forEach((point) => {
      const x = (room.position.x + point.x) / 100;
      const y = (room.position.y + point.y) / -100;
      if (x > bounds.max.x) {
        bounds.max.x = x;
      }
      if (y > bounds.max.y) {
        bounds.max.y = y;
      }
      if (x < bounds.min.x) {
        bounds.min.x = x;
      }
      if (y < bounds.min.y) {
        bounds.min.y = y;
      }
    });
  });

  // Make the bounds square and add some padding
  const width = bounds.max.x - bounds.min.x;
  const height = bounds.max.y - bounds.min.y;

  const targetSize = width > height ? width * 1.5 : height * 1.5;
  const hPadding = (targetSize - width) / 2;
  bounds.min.x -= hPadding;
  bounds.max.x += hPadding;

  const vPadding = (targetSize - height) / 2;
  bounds.min.y -= vPadding;
  bounds.max.y += vPadding;

  const lines = [];
  lines.push("floors:");
  Object.entries(levels).forEach( ([id, level]) => {
    lines.push("  - id: " + level.id);
    lines.push("    name: " + level.name);
    lines.push("    bounds:");
    lines.push(
      "      " +
        "[[" +
        bounds.min.x +
        ", " +
        bounds.min.y +
        ", " +
        level.elevation / 100 +
        "], [" +
        bounds.max.x +
        ", " +
        bounds.max.y +
        ", " +
        (level.elevation + +level.height) / 100 +
        "]]"
    );
    lines.push("    rooms:");
    Object.entries(rooms).filter(([_, room]) => {
      return room.levelId === level.xmlId;
    }).forEach(([id, room]) => {
      lines.push("      - name: " + room.name);
      lines.push("        points:");
      room.points.forEach((point) => {
        lines.push(
          "          - [" +
            (room.position.x + point.x) / 100 +
            ", " +
            (room.position.y + point.y) / -100 +
            "]"
        );
      });
    });
  });
  return lines.join("\n");
};

export { roomsToYaml };
