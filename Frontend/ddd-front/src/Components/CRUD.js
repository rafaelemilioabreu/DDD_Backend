import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

function CRUD() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
    { id: 3, name: "Item 3", description: "Description 3" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenDialog = (item) => {
    setOpenDialog(true);
    setSelectedItem(item);
    if (item) {
      setName(item.name);
      setDescription(item.description);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setName("");
    setDescription("");
  };

  const handleSaveItem = () => {
    if (selectedItem) {
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id ? { ...item, name, description } : item
      );
      setItems(updatedItems);
    } else {
      const newId = Math.max(...items.map((item) => item.id)) + 1;
      const newItem = { id: newId, name, description };
      setItems([...items, newItem]);
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog(null)}
      >
        Add Item
      </Button>

      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleOpenDialog(item)}
                  variant="contained"
                  color="secondary"
                  startIcon={<EditIcon />}
                >
                  Edit Item
                </Button>
                <Button
                  onClick={() => handleDeleteItem(item)}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete Item
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{selectedItem ? "Edit Item" : "Add Item"}</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSaveItem} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </TableBody>
      </Table>
    </>
  );
}

export default CRUD;
