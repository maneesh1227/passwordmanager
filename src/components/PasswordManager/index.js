import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordList from '../PasswordList'
import './index.css'

class PassWordManger extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    show: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPasswords = event => {
    this.setState({show: event.target.checked})
  }

  addItem = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (password !== '') {
      const newObj = {
        id: uuidv4(),
        website,
        username,
        password,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newObj],
        website: '',
        username: '',
        password: '',
      }))
    } else {
      this.setState({
        website: '',
        username: '',
        password: '',
      })
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const newpasswordsList = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordsList: newpasswordsList})
  }

  render() {
    const {
      passwordsList,
      password,
      website,
      username,
      show,
      searchInput,
    } = this.state
    const searchResults = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLocaleLowerCase()),
    )
    const count = searchResults.length
    console.log(count)
    return (
      <div className="bgm">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="input-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="image"
            alt="password manager"
          />
          <form className="input-card" onSubmit={this.addItem}>
            <h1 className="card-heading">Add New password</h1>
            <div className="input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
                className="input-logo"
              />
              <input
                className="input-box"
                type="text"
                value={website}
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="Username"
                className="input-logo"
              />
              <input
                className="input-box"
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                className="input-box"
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="passwords-section">
          <div className="search-bar">
            <div className="logo2">
              <h1 className="hed2">Your Passwords</h1>
              <p className="span-el">{count}</p>
            </div>
            <div className="search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onSearch}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-passwords-section">
            <input
              type="checkbox"
              onChange={this.toggleShowPasswords}
              id="show"
            />
            <label htmlFor="show">Show Passwords</label>
          </div>
          {count === 0 && (
            <div className="noPassword">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-pass"
                alt="no passwords"
              />
              <p className="no-pass-txt">No Passwords</p>
            </div>
          )}

          {count > 0 && (
            <div className="all-passwords">
              {searchResults.map(eachItem => (
                <PasswordList
                  deletePassword={this.deletePassword}
                  item={eachItem}
                  show={show}
                  key={eachItem.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PassWordManger
