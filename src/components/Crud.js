import React, { Component } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Input  } from 'reactstrap'
import axios from 'axios'
import Modalq from './Modal'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Icon from '@material-ui/core/Icon'

class Crud extends Component {
  state = {
    books: [],
    editBookData: {
      id:'',
      name:'',
      rating: ''
    },
     editModal: false
  }

  componentDidMount(){
    this.getData()
  }
  // method to get books from Api
  getData = async () => {
    let books = await axios.get(`http://localhost:3004/books`)
    this.setState({books: books.data})
  }
  // editing book method
  editBook = (id, name, rating) => {
   this.setState({
     editBookData: {id, name, rating}, editModal: !this.state.editModal
   })
  }

  // update book method
  updateBook = () => {
    let { id, name, rating } = this.state.editBookData;
   
    axios.put(`http://localhost:3004/books/${id}`, { name, rating }).then( response =>
    this.getData(),
      this.setState({
        editModal: !this.state.editModal, editBookData: {id:'', name: '', rating: '' },
        
      }),
      this.getData()
    )
  }

  // deleting data from server
  deleteBook(id){
    axios.delete(`http://localhost:3004/books/${id}`).then(response => 
    this.getData()
    )
  } 

  // where the magic starts
  render() {

    // destructuring books from the state
    const { books, editModal} = this.state

    // display books from Api
    let displayBooks = books.map(book => (
               
      <tr key={book.id}>
        <td style={{verticalAlign: 'middle'}}>{book.name}</td>
        <td style={{verticalAlign: 'middle'}}>{book.rating}</td> 
        <td>
          <IconButton aria-label="Edit" onClick={() => this.editBook(book.id, book.name, book.rating )}><Icon fontSize="small">edit_icon</Icon></IconButton>
          <IconButton aria-label="Delete" onClick={() =>  window.confirm("Are you sure you wish to delete this item?") && this.deleteBook(book.id)}><DeleteIcon fontSize="small" /></IconButton>
        </td>
      </tr>
  ))
    return (
      <div className="App container">
      {/* modal starts here */}
      <Modalq 
        getData={this.getData}
        books={this.state.books}
       
      />

        <Table size="sm">
        {/* start of table head */}
            <thead>
              <tr>
              <th>Book Name</th>
              <th>Rating</th>
              <th>Actions</th>
              </tr>
            </thead> 

            {/* start of table body */}
          <tbody>
             {displayBooks}
          </tbody>
        </Table>
        <Modal isOpen={editModal} toggle={this.editBook}>
            <ModalHeader toggle={this.editBook}>Edit Book</ModalHeader>
            <ModalBody>
                <FormGroup onSubmit={(e) => e.preventDefault()}>
                    <Input
                        placeholder="book name.." 
                        className="mb-2"
                        onChange={(e) => {
                          const {editBookData} = this.state
                          editBookData.name = e.target.value
                          this.setState({editBookData})
                      }
                  }                           
                        value={this.state.editBookData.name} 
                    />
                    <Input 
                        placeholder="rating.."
                        onChange={(e) => {
                          const {editBookData} = this.state
                          editBookData.rating = e.target.value
                          this.setState({editBookData})
                      }
                  }                          
                        value={this.state.editBookData.rating}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.updateBook}>Update Book</Button>
                <Button color="secondary" onClick={this.editBook}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
}
export default Crud