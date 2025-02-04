import {
  Button,
  Card,
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import SweetHomeImport from "./SweetHomeImport";
import { useState } from "react";
import { roomsToYaml } from "./yaml_util";
import Configuration from "./Configuration";

const LeftPanel = ({ rooms, setRooms, configuration, setConfiguration }) => {
  const [yamlDialogOpen, setYamlDialogOpen] = useState(false);

  return (
    <>
      <Dialog
        onClose={() => setYamlDialogOpen(false)}
        open={yamlDialogOpen}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              minWidth: "45rem",
              maxWidth: "100%", // Set your width here
            },
          },
        }}
      >
        <DialogTitle>Espresence configuration</DialogTitle>
        {yamlDialogOpen ? (
          <textarea style={{ width: "100%", minHeight: "80vh" }}>
            {roomsToYaml(configuration, rooms)}
          </textarea>
        ) : null}
      </Dialog>
      <Card>
        <Stack sx={{ margin: "1rem" }} gap={2}>
          <Typography variant="h5">1 - Import Sweethome 3D file</Typography>
          <SweetHomeImport setRooms={setRooms} />
          <Divider />
          <Typography variant="h5">2 - Configuration</Typography>
          <Configuration
            configuration={configuration}
            setConfiguration={setConfiguration}
          />
          <Divider />
          <Typography variant="h5">3 - Generate YAML file</Typography>
          <Button onClick={() => setYamlDialogOpen(true)}>Generate YAML</Button>
        </Stack>
      </Card>
    </>
  );
};

export default LeftPanel;
