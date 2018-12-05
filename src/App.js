import React, { Component } from 'react'
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Input  } from 'reactstrap'
import axios from 'axios'
import Modalq from './components/Modal'

class App extends Component {
  state = {
    books: [],
    editBookData: {
      id:'',
      name:'',
      rating: ''
    }, editModal: false
  }

  componentDidMount(){
    this.getData()
  }
  // method to get books from Api
  getData = async () => {
    let books = await axios.get(`http://localhost:3004/books`)
    this.setState({books: books.data})
  }

  updateBook = (id, name, rating) => {
   this.setState({
     editBookData: {id, name, rating}, editModal: !this.state.editModal
   })
  }
  render() {

    // destructuring books from the state
    const { books, editModal} = this.state

    // display books from Api

    return (
      <div className="App container">
      {/* modal starts here */}
      <Modalq books={this.state.books}/>



        <Table striped>
        {/* start of table head */}
            <thead>
              <tr>
              <th>#id</th>
              <th>Book Name</th>
              <th>Rating</th>
              <th>Actions</th>
              </tr>
            </thead> 

            {/* start of table body */}
          <tbody>
             {books.map((book) => (
               
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.rating}</td> 
                <td>
                  <Button className="mr-2" size="sm" color="success" onClick={() => this.updateBook(book.id, book.name, book.rating )}>Edit</Button>
                  <Button className="mr-2" size="sm" color="danger">Delete</Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
        <Modal isOpen={editModal} toggle={this.updateBook}>
              <ModalHeader toggle={this.updateBook}>Edit Book</ModalHeader>
              <ModalBody>
                  <FormGroup onSubmit={(e) => e.preventDefault()}>
                      <Input
                          placeholder="book name.." 
                          className="mb-2" 
                          value={this.state.editBookData.name} 
                      />
                      <Input 
                          placeholder="rating.."
                          value={this.state.editBookData.rating}
                      />
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={() => this.updateBook()}>Update Book</Button>
                  <Button color="secondary" onClick={this.updateBook}>Cancel</Button>
              </ModalFooter>
            </Modal>
      </div>
    );
  }
}

export default App;