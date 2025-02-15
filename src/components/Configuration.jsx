import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Configuration = ({
  configuration,
  setConfiguration,
  levels,
  setLevels,
  selectedLevel,
  setSelectedLevel,
}) => {
  function updateLevel(updatedLevel) {
    let newLevels = [];
    for (let i = 0; i < levels.length; i++) {
      if (levels[i].xmlId !== updatedLevel.xmlId) {
        newLevels[i] = levels[i];
      } else {
        newLevels[i] = updatedLevel;
      }
    }
    setLevels(newLevels);
    setSelectedLevel(updatedLevel);
  }
  const handleFloorIdChange = (e) => {
    selectedLevel.id = e.target.value;
    updateLevel(selectedLevel);
  };
  const handleFloorNameChange = (e) => {
    selectedLevel.name = e.target.value;
    updateLevel(selectedLevel);
  };
  const handleElevationChange = (e) => {
    selectedLevel.elevation = e.target.value;
    updateLevel(selectedLevel);
  };
  const handleHeightChange = (e) => {
    selectedLevel.height = e.target.value;
    updateLevel(selectedLevel);
  };
  return (
    <>
      <FormControl>
        <InputLabel>Floor</InputLabel>
        <Select
          value={
            selectedLevel && selectedLevel.xmlId ? selectedLevel.xmlId : ""
          }
          label="Floor"
          onChange={(e) =>
            setSelectedLevel(levels.find((l) => l.xmlId === e.target.value))
          }
        >
          {levels?.map((level) => (
            <MenuItem key={level.xmlId} value={level.xmlId}>
              {level.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Floor ID"
        value={selectedLevel.id}
        onChange={handleFloorIdChange}
      />
      <TextField
        label="Floor name"
        value={selectedLevel.name}
        onChange={handleFloorNameChange}
      />
      <TextField
        label="Elevation (cm)"
        value={selectedLevel.elevation}
        onChange={handleElevationChange}
      />
      <TextField
        label="Height (cm)"
        value={selectedLevel.height}
        onChange={handleHeightChange}
      />
    </>
  );
};

export default Configuration;
