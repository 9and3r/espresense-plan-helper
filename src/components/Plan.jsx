import { useRef } from "react";
import { Layer, Line, Stage, Text } from "react-konva";
const Plan = ({ dimensions, rooms, setRooms, setSelectedRoomId, selectedLevel }) => {
  const stars = [{ id: 1, x: 1, y: 1 }];
  const stageRef = useRef();

  const onWheel = (e) => {
    const scaleBy = 1.08;

    const stage = stageRef.current;

    // stop de=ault scrolling
    e.evt.preventDefault();

    var oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  };

  return (
    <Stage
      ref={stageRef}
      width={dimensions.width}
      height={dimensions.height}
      draggable
      onWheel={onWheel}
      onClick={(e) => {
        const emptySpace = e.target === e.target.getStage();
        if (!emptySpace) {
          return;
        }
        setSelectedRoomId(null);
      }}
    >
      <Layer >
        {Object.entries(rooms).filter(([_, room]) => {
          return room.levelId === selectedLevel.xmlId;
        }).map(([id, room]) => {
          return (
            <Line
                key={id}
                x={room.position.x}
                y={room.position.y}
                points={room.points.flatMap((point) => [point.x, point.y])}
                closed
                stroke="white"
                draggable
                onClick={(e) => setSelectedRoomId(room.id)}
                onDragMove={(e) => {
                  if (e.type !== "dragmove") {
                    return;
                  }
                  setRooms((oldRooms) => {
                    const newRooms = { ...oldRooms };
                    const currentRoom = { ...room };
                    currentRoom.position = {
                      x: e.target.attrs.x,
                      y: e.target.attrs.y,
                    };
                    newRooms[room.id] = currentRoom;
                    return newRooms;
                  });
                }}
              ></Line>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Plan;
