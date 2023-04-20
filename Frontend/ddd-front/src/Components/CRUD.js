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
import InfoIcon from '@mui/icons-material/Info';

function CRUD() {

    
    const bookService = new BookService();
    useEffect(() => {
        
        bookService.getBooks().then(data => setBooks(data));

    }, []);


    const [books, setBooks] = useState([]);
 
  

  const [openDialog, setOpenDialog] = useState(false);
  const [consultDialog, setConsultDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  

  const handleOpenDialog = (item) => {
    setOpenDialog(true);
    setSelectedItem(item);
   
  };

  const handleOpenConsultDialog = (item) => {
    setConsultDialog(true);
    setSelectedItem(item);
   
    };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
   
  };

    const handleCloseConsultDialog = () => {
    setConsultDialog(false);
    setSelectedItem(null);

    };

  const handleSaveItem = () => {
    if (selectedItem) {
      const updatedItems = books.map((item) =>
        item.id === selectedItem.id ? { ...item, selectedItem } : item
      );
      setBooks(updatedItems);
    } else {
      const newId = Math.max(...books.map((item) => item.id)) + 1;
      const newItem = { id: newId, selectedItem };
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
      
          <TableCell>Title</TableCell>
         
          <TableCell>Publisher</TableCell>
            <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              
                <TableCell>{book.title}</TableCell>
               
                <TableCell>{book.publisher}</TableCell>
                
              
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
                
                <Button
                    onClick={() => handleOpenConsultDialog(book)}
                    variant="contained"
                    color="info"
                    startIcon={<InfoIcon />}
                >
                    Consult book
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* Create/Update dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{selectedItem ? "Edit Item" : "Add Item"}</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                value={selectedItem ? selectedItem.name : ""}
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={selectedItem ? selectedItem.description : ""}
                onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button onClick={handleSaveItem} color="secondary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {/* Consult dialog */}
            <Dialog open={consultDialog} onClose={handleCloseConsultDialog}>
                <DialogTitle>Consult Item</DialogTitle>
                <DialogContent>
                    <TextField

                        label="Id"
                        value={selectedItem ? selectedItem.id : ""}
                        fullWidth
                        margin="normal"
                        disabled={true}
                    />
                    <TextField
                        label="Title"
                        value={selectedItem ? selectedItem.title : ""}
                        fullWidth
                        margin="normal"
                        disabled={true}
                    />
                    <TextField
                        label="Author"
                        value={selectedItem ? selectedItem.author : ""}
                        fullWidth
                        margin="normal"
                        disabled={true}
                    />
                    <TextField
                        label="Publisher"
                        value={selectedItem ? selectedItem.publisher : ""}
                        fullWidth
                        margin="normal"
                        disabled={true}
                    />
                    <TextField
                        label="Year"
                        value={selectedItem ? selectedItem.year : ""}
                        fullWidth
                        margin="normal"
                        disabled={true}
                    />
                   
                </DialogContent>
                </Dialog>
                


        </TableBody>
      </Table>
    </>
  );
}

export default CRUD;
