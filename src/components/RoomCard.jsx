import { Button, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

const RoomCard = ({ room, updateRoom }) => {
  return (
    <Stack>
      <TextField
        label="Name"
        variant="outlined"
        value={room.name}
        onChange={(e) =>
          updateRoom({
            ...room,
            name: e.target.value,
          })
        }
      />
      <Typography>Points</Typography>
      <Button
        onClick={() => {
          updateRoom({ ...room, points: [...room.points, { x: 0, y: 0 }] });
        }}
      >
        Add
      </Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gap: "0.5rem",
        }}
      >
        <TextField
          label="X"
          variant="outlined"
          value={room.position.x}
          onChange={(e) =>
            updateRoom({
              ...room,
              position: { x: parseFloat(e.target.value), y: room.position.y },
            })
          }
        />
        <TextField
          label="Y"
          variant="outlined"
          value={room.position.y}
          onChange={(e) =>
            updateRoom({
              ...room,
              position: { x: room.position.x, y: parseFloat(e.target.value) },
            })
          }
        />
        {room.points.map((point, index) => (
          <>
            <TextField
              label="X"
              variant="outlined"
              value={point.x}
              onChange={(e) => {
                const newPoint = { x: parseFloat(e.target.value), y: point.y };
                const newPoints = [...room.points];
                newPoints[index] = newPoint;
                updateRoom({ ...room, points: newPoints });
              }}
            />
            <TextField
              label="Y"
              variant="outlined"
              value={point.y}
              onChange={(e) => {
                const newPoint = { x: point.x, y: parseFloat(e.target.value) };
                const newPoints = [...room.points];
                newPoints[index] = newPoint;
                updateRoom({ ...room, points: newPoints });
              }}
            />
          </>
        ))}
      </div>
    </Stack>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object,
  setRooms: PropTypes.func,
};

export default RoomCard;
