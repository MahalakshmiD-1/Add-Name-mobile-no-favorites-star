import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
/* adding uuid as alias here for v4 method  INSTALL-npm install uuid */

import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    /* adding uuidv4() method for all id's */
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
  }

  togglesFavorite = id => {
    /*  used for each contact and condition is if favorite then doing unfavorite and viceversa and returing */
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  onAddContact = event => {
    /* preventDefault is used to avoid any uncommon behavior */
    event.preventDefault()
    /* adding new contact we used below code */
    const {name, mobileNo} = this.state
    const newContact = {
      id: uuidv4(),
      name,
      mobileNo,
      isFavorite: false,
    }
    /*  it is used to update previous state by using setstate and prevstate */
    this.setState(prevState => ({
      /* here we cannot use array.push() so we use ...prevstate.contactlist */
      contactsList: [...prevState.contactsList, newContact],
      /* after adding name,mobileno we use empty string to clear that  */
      name: '',
      mobileNo: '',
    }))
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                togglesFavorite={this.togglesFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
