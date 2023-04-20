import React, { useState, useEffect } from "react";
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
import BookService from "../Service/BookService";

function CRUD() {

    

    useEffect(() => {
        const bookService = new BookService();
        bookService.getBooks().then(data => setBooks(data));

    }, []);


    const [books, setBooks] = useState([]);
  

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
      const updatedItems = books.map((item) =>
        item.id === selectedItem.id ? { ...item, name, description } : item
      );
      setBooks(updatedItems);
    } else {
      const newId = Math.max(...books.map((item) => item.id)) + 1;
      const newItem = { id: newId, name, description };
      setBooks([...books, newItem]);
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (item) => {
    const updatedItems = books.filter((i) => i.id !== item.id);
    setBooks(updatedItems);
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
          <TableCell>Title</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Publisher</TableCell>
            <TableCell>Year</TableCell>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                
                <TableCell>{book.year.slice(0,4)}</TableCell>
              
              <TableCell>
                <Button
                  onClick={() => handleOpenDialog(book)}
                  variant="contained"
                  color="secondary"
                  startIcon={<EditIcon />}
                >
                  Edit book
                </Button>
                <Button
                  onClick={() => handleDeleteItem(book)}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete book
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
