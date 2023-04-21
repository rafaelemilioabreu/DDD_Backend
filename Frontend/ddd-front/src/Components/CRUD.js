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
import InfoIcon from "@mui/icons-material/Info";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function CRUD() {
  const [books, setBooks] = useState([]);
  const bookService = new BookService();
  const getData = () => {
    bookService.getBooks().then((data) => setBooks(data));
  };
  useEffect(() => {
    getData();
  }, [books]);

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!selectedItem.title) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!selectedItem.publisher) {
      errors.publisher = "Publisher is required";
      isValid = false;
    }

    if (!selectedItem.author) {
      errors.author = "Author is required";
      isValid = false;
    }

    
    if (!selectedItem.year || isNaN(Date.parse(selectedItem.year)) !== false) {
      errors.year = "Year is required";
      isValid = false;
      
    }

    setFormErrors(errors);

    return isValid;
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [consultDialog, setConsultDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    title: "",
    author: "",
    publisher: "",
    year: null,
  });

  const handleOpenDialog = (item) => {
    setOpenDialog(true);
    setSelectedItem({ ...item });
  };

  const handleOpenConsultDialog = (item) => {
    setConsultDialog(true);
    setSelectedItem({ ...item });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem({
      id: 0,
      title: "",
      author: "",
      publisher: "",
      year: null,
    });
  };

  const handleCloseConsultDialog = () => {
    setConsultDialog(false);
    setSelectedItem({
      id: 0,
      title: "",
      author: "",
      publisher: "",
      year: null,
    });
  };

  const handleSaveItem = () => {
    if (validateForm()) {
      console.log("Form is invalid");
      if (selectedItem.id > 0 && selectedItem.id !== undefined) {
        bookService.updateBook(selectedItem).then((data) => {
          selectedItem(data);
          getData();
        });
      } else {
        bookService.addBook(selectedItem).then((data) => {
          selectedItem(data);
          getData();
        });
      }

      handleCloseDialog();
    }
  };

  const handleDeleteItem = (item) => {
    bookService.deleteBook(item).then((data) => {
      selectedItem(data);
      getData();
    });
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              <DialogTitle>
                {selectedItem ? "Edit Item" : "Add Item"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Title"
                  value={selectedItem ? selectedItem.title : ""}
                  onChange={(e) => {
                    setSelectedItem({ ...selectedItem, title: e.target.value });
                  }}
                  fullWidth
                  margin="normal"
                  error={formErrors.title ? true : false}
                  helperText={formErrors.title}
                />

                <TextField
                  label="Publisher"
                  value={selectedItem ? selectedItem.publisher : ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      publisher: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  error={formErrors.publisher ? true : false}
                  helperText={formErrors.publisher}
                />

                <TextField
                  label="Author"
                  value={selectedItem ? selectedItem.author : ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, author: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  error={formErrors.author ? true : false}
                  helperText={formErrors.author}
                />

                <DatePicker
                  value={
                    selectedItem && selectedItem.year
                      ? new Date(selectedItem.year)
                      : null
                  }
                  onChange={(date) => {
                    setSelectedItem({ ...selectedItem, year: date });
                  }}
                  onError={(newError) =>
                    setFormErrors({ ...formErrors, year: newError })
                  }
                  slotProps={{
                    textField: {
                      helperText: formErrors.year,
                      error: formErrors.year ? true : false,
                    },
                  }}
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

                <DatePicker
                  value={
                    selectedItem && selectedItem.year
                      ? new Date(selectedItem.year)
                      : null
                  }
                  disabled={true}
                />
              </DialogContent>
            </Dialog>
          </TableBody>
        </Table>
      </LocalizationProvider>
    </>
  );
}

export default CRUD;
