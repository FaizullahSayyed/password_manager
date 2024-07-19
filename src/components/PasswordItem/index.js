import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPassword, deletePassword} = props
  const {id, website, username, password, bgColor} = passwordDetails
  const profileName = website[0]

  const onClickDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="list-item">
      <div className={`profile-container ${bgColor}`}>
        <p className="profile-name">{profileName}</p>
      </div>
      <div className="details-button-container">
        <div className="details-container">
          <p className="website-name">{website}</p>
          <p className="user-name">{username}</p>
          {showPassword ? (
            <p>{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="stars-image"
              alt="stars"
            />
          )}
        </div>
        <div className="delete-button-container">
          <button
            type="button"
            className="delete-button"
            onClick={onClickDelete}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete-button-image"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PasswordItem
