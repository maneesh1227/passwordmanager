import './index.css'

const PasswordList = props => {
  const {item, show, deletePassword} = props
  const {id, website, username, password} = item
  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <div className="li">
      <p className="name-logo">{website[0].toUpperCase()}</p>
      <div className="content">
        <p className="website">{website}</p>
        <p className="website">{username}</p>
        {!show && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
        {show && <p className="website">{password}</p>}
      </div>
      <button
        onClick={onDelete}
        data-testid="delete"
        type="button"
        className="delete-btn"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </div>
  )
}

export default PasswordList
