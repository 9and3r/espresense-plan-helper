import { TextField } from "@mui/material";

const Configuration = ({ configuration, setConfiguration }) => {
  return (
    <>
      <TextField label="Floor ID" value={configuration.floorId} />
      <TextField label="Floor name" value={configuration.floorName} />
    </>
  );
};

export default Configuration;
