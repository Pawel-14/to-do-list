import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";


export default function AddNewTask() {
  const [showField, SetShowField] = useState(false);

  const handleOpenPopup = () => {
    SetShowField(true);
  };

  const handleClosePopup = () => {
    SetShowField(false);
  };

  return (
    <div>
      {showField ? (
        <div className="popup-container">
          <p className="popup-title">Task Creator</p>
          <div className="popup-actions">
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <Button size="medium" onClick={handleClosePopup}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      <div className="center-addbtn">
        <div className="addbtn">
          <Button
            onClick={handleOpenPopup}
            variant="contained"
            color="info"
            startIcon={<AddIcon />}
          >
            Create new task
          </Button>
        </div>
      </div>
    </div>
  );
}
