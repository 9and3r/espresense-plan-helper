import { Button, Stack, Typography } from "@mui/material";
import RoomCard from "./RoomCard";
import PropTypes from "prop-types";

const RoomToolbar = ({ rooms, setRooms, selectedRoomId, updateRoom }) => {
  console.log(rooms);
  console.log(selectedRoomId);
  console.log(rooms[selectedRoomId]);

  return (
    <Stack gap={1} sx={{ padding: "1rem" }}>
      <Button
        onClick={() => {
          let maxID = -1;
          Object.entries(rooms).forEach((id) => {
            if (id > maxID) {
              maxID = id;
            }
          });
          maxID++;
          setRooms((oldRooms) => {
            let newRooms = { ...oldRooms };
            newRooms[maxID] = {
              id: maxID,
              name: "a",
              position: { x: 0, y: 0 },
              points: [
                { x: 10, y: 10 },
                { x: 30, y: 50 },
                { x: 10, y: 50 },
              ],
            };
            return newRooms;
          });
        }}
      >
        Add
      </Button>
      {selectedRoomId ? (
        <RoomCard room={rooms[selectedRoomId]} updateRoom={updateRoom} />
      ) : null}
    </Stack>
  );
};

RoomToolbar.propTypes = {
  rooms: PropTypes.array,
  setRooms: PropTypes.func,
};

export default RoomToolbar;
