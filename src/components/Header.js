import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

export default class Header extends Component {
  render() {
    return (
      <Paper elevation="10"> 
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Store your books with ease!
          </h1>
          <h2 class="subtitle">
           easily add, update and delete your books with this easy to use app
          </h2>
        </div>
      </div>
    </section>
    </Paper>
    )
  }
}
