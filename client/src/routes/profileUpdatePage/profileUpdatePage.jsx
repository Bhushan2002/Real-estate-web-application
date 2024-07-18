import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";



function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const [error, setError]= useState("")
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put(`/user/${currentUser.id}/`, {
        username,
        email,
        password,
        // avatar:avatar[0]
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          {/* <h1>Update Profile</h1>
          <div className="profilePic">
            <h4>upload profile picture</h4>
            <img src="/noavatar.png" alt="" height={100} />
            {/* <input
              type="file"
              className="custom-file-upload"
              id="file-upload"
              name="file"
            /> 
          </div> */}
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button >Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src="/profile-bg.png" alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
