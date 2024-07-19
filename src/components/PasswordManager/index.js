import {Component} from 'react'
import {v4 as v4uuid} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const colorsList = [
  'blue',
  'purple',
  'yellow',
  'green',
  'orange',
  'skye',
  'red',
  'gray',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    showPassword: false,
    searchText: '',
  }

  updateWebsite = event => this.setState({website: event.target.value})

  updateUsername = event => this.setState({username: event.target.value})

  updatePassword = event => this.setState({password: event.target.value})

  updateSearchText = event => this.setState({searchText: event.target.value})

  toggleCheckbox = () =>
    this.setState(prevSate => ({showPassword: !prevSate.showPassword}))

  updatePasswordList = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: v4uuid(),
      website,
      username,
      password,
      bgColor: colorsList[Math.floor(Math.random() * colorsList.length)],
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  filterPassword = () => {
    const {searchText, passwordList} = this.state
    if (searchText) {
      const filteredList = passwordList.filter(password =>
        password.website.toLowerCase().includes(searchText.toLowerCase()),
      )
      return filteredList
    }
    return passwordList
  }

  deletePassword = id =>
    this.setState(prevSate => ({
      passwordList: prevSate.passwordList.filter(
        password => password.id !== id,
      ),
    }))

  render() {
    const {website, username, password, showPassword, searchText} = this.state

    const filteredPasswords = this.filterPassword()

    return (
      <div className="bg-container">
        <div className="inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
          <div className="input-container">
            <div className="form-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="form-image"
              />
            </div>

            <form>
              <div className="form-container">
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-box-container">
                  <label htmlFor="websiteInput">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                      alt="website"
                      className="input-image"
                    />
                  </label>
                  <input
                    className="input-box"
                    type="text"
                    placeholder="Enter Website"
                    id="websiteInput"
                    value={website}
                    onChange={this.updateWebsite}
                  />
                </div>

                <div className="input-box-container">
                  <label htmlFor="usernameInput">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="input-image"
                    />
                  </label>
                  <input
                    className="input-box"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.updateUsername}
                  />
                </div>

                <div className="input-box-container">
                  <label htmlFor="passwordInput">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="input-image"
                    />
                  </label>
                  <input
                    className="input-box"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.updatePassword}
                  />
                </div>

                <div className="form-button-container">
                  <button
                    type="submit"
                    className="form-button"
                    onClick={this.updatePasswordList}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="password-container">
            <div className="search-box-container">
              <div className="password-list-heading-container">
                <h1 className="list-container-heading">Your Passwords</h1>
                <div className="count-container">
                  <p className="count">{filteredPasswords.length}</p>
                </div>
              </div>
              <div className="search-box-container">
                <label htmlFor="searchInput">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </label>
                <input
                  type="search"
                  className="search-box"
                  placeholder="search"
                  value={searchText}
                  onChange={this.updateSearchText}
                />
              </div>
            </div>
            <div className="check-box-container">
              <input
                type="checkbox"
                id="showPassword"
                onChange={this.toggleCheckbox}
              />
              <label htmlFor="showPassword">Show Passwords</label>
            </div>
            <hr className="hr-line" />
            {filteredPasswords.length === 0 ? (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-image"
                />
                <p className="no-password-heading">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list-container">
                {filteredPasswords.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    showPassword={showPassword}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
