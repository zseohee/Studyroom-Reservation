import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import styled from "styled-components";
import { getFormat, setFormat } from "./event-utils";
import { ModalData } from "./types";

interface Props { 
  data: ModalData; 
  setData: any;
  open: boolean;
  setOpen: (b: boolean) => void;
  confirm?: () => void;
}

export default function BasicModal({
  data,
  setData,
  open,
  setOpen,
  confirm,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ModalData 
  ) => {
    const value = event.target.value; 
    setData((prev: any) => ({ ...prev, [key]: value }));
  };
  const handleChangeTime = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    key: keyof ModalData
  ) => {
    const value = e.target.value; 
    const timezone = "+" + data.selectInfo?.startStr.split("+")[1];
    setData((prev: any) => ({ ...prev, [key]: setFormat(value, timezone) })); 
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title" 
      aria-describedby="modal-modal-description" 
    >
      <Container>
        <StyledPaper elevation={5}>
          <div className="header">New Reservation</div>
          <FormControl size={"small"}>
            <InputLabel>Password*</InputLabel>

            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={data?.password} 
              fullWidth
              size="small"
              label="Password"
              required 
              onChange={(event) => handleData(event, "password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            value={data?.title} 
            fullWidth
            size="small"
            label="Your Name and Student ID"
            variant="outlined"
            placeholder="amy, 12345"
            required
            onChange={(event) => handleData(event, "title")}
          />
          <div className="date-field">
            <div>
              <TextField
                onChange={(e) => handleChangeTime(e, "startStr")}
                value={getFormat(data?.startStr || data?.selectInfo?.startStr)}
                fullWidth
                size="small"
                label="Start"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => handleChangeTime(e, "endStr")}
                value={getFormat(data?.endStr || data?.selectInfo?.endStr)}
                fullWidth
                size="small"
                label="End"
                variant="outlined"
              />
            </div>
          </div>
          <TextField
            value={data?.members} 
            fullWidth
            size="small"
            label="Other Group Members?"
            variant="outlined"
            placeholder="name1, name2, etc"
            onChange={(event) => handleData(event, "members")}
          />
          <div className="footer">
            <Button
              variant="outlined"
              size="small"
              onClick={handleClose}
              style={{ textTransform: "none" }} 
            >
              close
            </Button>

            <Button
              variant="contained"
              size="small"
              disableElevation
              style={{ textTransform: "none" }}
              onClick={confirm}
              disabled={!data?.password && !data?.title} 
            >
              confirm
            </Button>

          </div>
        </StyledPaper>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 1.6rem 0.8rem;
  row-gap: 1.6rem;
  border: 0.2rem;
  > .header { 
    border-bottom: 0.2rem solid lightgray;
  }
  > .date-field {
    display: flex;
    justify-content: space-between;
    > div {
      width: 48%;
    }
  }
  > .footer {
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
    justify-content: flex-end;
  }
`;
