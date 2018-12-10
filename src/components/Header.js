import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

export default class Header extends Component {
  render() {
    return (
      <Paper elevation={10}> 
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Store your books with ease!
              </h1>
              <h2 className="subtitle">
              easily add, update and delete your books with this easy to use app
              </h2>
            </div>
          </div>
        </section>
      </Paper>
    )
  }
}
