import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const SweetHomeImport = ({ setRooms, setLevels, setSelectedLevel }) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Do something with the files
      if (acceptedFiles.length === 0) {
        return;
      }
      const entries = await new ZipReader(
        new BlobReader(acceptedFiles[0])
      ).getEntries({});

      const homeXMLEntry = entries.find(
        (entry) => entry.filename === "Home.xml"
      );
      const homeText = await homeXMLEntry.getData(new TextWriter());

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(homeText, "text/xml");
      let result = {};
      let id = 1;
      const rooms = xmlDoc.getElementsByTagName("room");
      const levelElements = xmlDoc.getElementsByTagName("level");
      let levels= [];

      if( levelElements.length > 0 ) {
        for (let i = 0; i < levelElements.length; i++) {
          let level = levelElements[i];
          levels[i]= {
            xmlId: level.attributes.id?.nodeValue,
            id: level.attributes.id?.nodeValue,
            name: level.attributes.name?.nodeValue,
            elevation: parseFloat(level.attributes.elevation?.nodeValue),
            height: parseFloat(level.attributes.height?.nodeValue),
            floorThickness: parseFloat(level.attributes.floorThickness?.nodeValue)
          }
        }
        levels.sort((a,b) => {
          return a.elevation - b.elevation;
        })
      } else {
        levels[levels.length]= {
          id: "first",
          name: "First floor",
          xmlId: "level-235c9abb-1108-441a-8a2d-8f7e100d7554",
          elevation: 0,
          height: 300,
          floorThickness: 0
        };
      }

      let minX = Number.MAX_VALUE,
      minY= Number.MAX_VALUE;
      for (let i = 0; i < rooms.length; i++) {
        let room = rooms[i];
        let roomObject = {
          id: id,
          name: room.attributes.name?.nodeValue || "Un-named",
          levelId: room.attributes.level?.nodeValue || levels[0].xmlId,
          points: [],
        };
        let points = room.getElementsByTagName("point");
        let offset = null;
        for (let z = 0; z < points.length; z++) {
          let point = points[z];
          let pointX= parseFloat(point.attributes.x.nodeValue);
          let pointY= parseFloat(point.attributes.y.nodeValue);
          if (offset === null) {
            offset = {
              x: pointX,
              y: pointY,
            };
            roomObject.points.push({ x: 0, y: 0 });
            continue;
          }
          let currentPoint = {
            x: pointX - offset.x,
            y: pointY - offset.y,
          };
          if( pointX <= minX ) {
            minX= pointX;
          }
          if( pointY < minY ) {
            minY= pointY;
          }
          roomObject.points.push(currentPoint);
        }
        roomObject.position = offset;
        result[id] = roomObject;
        id++;
      }
      // Offset the positions to top-left of drawing
      for (let roomId in result) {
        if( minX < 0 ) {
          result[roomId].position.x += minX;
        } else {
          result[roomId].position.x -= minX;
        }
        if( minY < 0 ) {
          result[roomId].position.y += minY;
        } else {
          result[roomId].position.y -= minY;
        }
      }
      setLevels(levels);
      setSelectedLevel(levels[0]);
      setRooms(result);
    },
    [setRooms]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      style={{
        margin: "1rem",
        minHeight: "8rem",
        border: isDragActive ? "5px dashed blue" : "3px dashed white",
        borderRadius: "2rem",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <input {...getInputProps()} />
      Drop .sh3d file here
    </div>
  );
};

export default SweetHomeImport;
