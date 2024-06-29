import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const SweetHomeImport = ({ setRooms }) => {
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

      for (let i = 0; i < rooms.length; i++) {
        let room = rooms[i];
        let roomObject = {
          id: id,
          name: room.attributes.name?.nodeValue,
          points: [],
        };
        let points = room.getElementsByTagName("point");
        let offset = null;
        for (let z = 0; z < points.length; z++) {
          let point = points[z];
          if (offset === null) {
            offset = {
              x: parseFloat(point.attributes.x.nodeValue),
              y: parseFloat(point.attributes.y.nodeValue),
            };
            roomObject.points.push({ x: 0, y: 0 });
            continue;
          }
          let currentPoint = {
            x: parseFloat(point.attributes.x.nodeValue) - offset.x,
            y: parseFloat(point.attributes.y.nodeValue) - offset.y,
          };
          roomObject.points.push(currentPoint);
        }
        roomObject.position = offset;
        result[id] = roomObject;
        id++;
      }
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
