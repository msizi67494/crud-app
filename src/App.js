import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import axios from 'axios'
import Modalq from './components/Modal'


class App extends Component {

  state = {
    books: [],
  }


  // method to get books from Api
  async componentDidMount(){
    let books = await axios.get(`http://localhost:3004/books`)
    this.setState({books: books.data})
  }
  render() {

    // destructuring books from the state
    const { books} = this.state

    // display books from Api
     let displayBooks = books.map((book) => (
      <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.name}</td>
        <td>{book.rating}</td> 
        <td>
          <Button className="mr-2" size="sm" color="success">Edit</Button>
          <Button className="mr-2" size="sm" color="danger">Delete</Button>
        </td>
      </tr>
    ))

    return (
      <div className="App container">
      {/* modal starts here */}
      <Modalq books={this.state.books}/>

        <Table striped>
        {/* start of table head */}
            <thead>
              <th>#id</th>
              <th>Book Name</th>
              <th>Rating</th>
              <th>Actions</th>
            </thead> 

            {/* start of table body */}
          <tbody>
             {displayBooks}
          </tbody>
          
        </Table>
      </div>
    );
  }
}

export default App;
