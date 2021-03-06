import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Input } from 'reactstrap'
import axios from 'axios'
import { Fab, Snackbar, Fade } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export default class Modalq extends Component {

    constructor(props){
        super(props)

        this.state = {
            modal: false,
            bookData: {
              name: '',
              rating:''
            },
            snackbarState: false
        }
    }

    handleSnackbarTogglem = () => {
        this.setState({snackbarState: !this.state.snackbarState })
    }

  // modal toggle method
  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

// add book
  addBook = () => {
    axios.post(`http://localhost:3004/books`, this.state.bookData)
    .then((response) => {

        let newBooks = this.props.books
        newBooks.push(response.data)
    
        this.setState({newBooks, modal: !this.state.modal, bookData: {
            name: '',
            rating:'',
            },
               
        })
        this.props.getData()
    })
    this.handleSnackbarTogglem()
  
  }

  render() {
      const { modal, bookData } = this.state

    return (
      <div>
        <Fab color="primary" size="small" aria-label="Add" style={{ margin: 20 }} onClick={this.toggleModal} ><AddIcon/></Fab>
            <Modal isOpen={modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add New Book</ModalHeader>
                <ModalBody>
                    <FormGroup onSubmit={(e) => e.preventDefault()}>
                        <Input
                            placeholder="book name.." 
                            className="mb-2" 
                            onChange={(e) => {
                                        const {bookData} = this.state
                                        bookData.name = e.target.value
                                        this.setState({bookData})
                                    }
                                }
                            value={bookData.name} 
                        />
                        <Input 
                            placeholder="rating.."
                            onChange={(e) => {
                                const { bookData } = this.state
                                bookData.rating = e.target.value
                                this.setState({bookData})
                            }}
                            value={bookData.rating}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addBook}>Add Book</Button>
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>,

             <Snackbar
                open={this.state.snackbarState}
                autoHideDuration={3000}
                onClose={this.handleSnackbarTogglem}
                TransitionComponent={Fade}
                message={<span id="message-id">Book Successfully Added </span>}
            />
      </div>
    )
  }
}
