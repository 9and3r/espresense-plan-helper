import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import RoomToolbar from "./components/RoomToolbar";
import Plan from "./components/Plan";
import { Card, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LeftPanel from "./components/LeftPanel";

function App() {
  const [rooms, setRooms] = useState({});
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [configuration, setConfiguration] = useState({
    floorId: "first",
    floorName: "First floor",
  });

  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const updateRoom = useCallback((newRoom) => {
    setRooms((oldRooms) => {
      const newRooms = { ...oldRooms };
      newRooms[newRoom.id] = newRoom;
      return newRooms;
    });
  }, []);

  // We cant set the h & w on Stage to 100% it only takes px values so we have to
  // find the parent container's w and h and then manually set those !
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "25rem 1fr",
        }}
      >
        <LeftPanel
          rooms={rooms}
          setRooms={setRooms}
          configuration={configuration}
          setConfiguration={setConfiguration}
        />
        <div ref={divRef}>
          <Plan
            dimensions={dimensions}
            rooms={rooms}
            setRooms={setRooms}
            setSelectedRoomId={setSelectedRoomId}
          />
        </div>
        {false ? (
          <div>
            <Card>
              <RoomToolbar
                rooms={rooms}
                setRooms={setRooms}
                selectedRoomId={selectedRoomId}
                updateRoom={updateRoom}
              />
            </Card>
          </div>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
