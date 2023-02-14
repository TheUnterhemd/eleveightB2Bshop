import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { register, isPending, error } = useRegister();

  //A Function to submit the data to firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, displayName, thumbnail,company, taxNumber,region);
    navigate("/")
  };

  /** A function to check the type the size of the user Pic */
  const handleFileChange = (e) => {
    /** A clean up to the input type file so it will only take the last file we upload */
    setThumbnail(null);

    let selected = e.target.files[0];

    console.log(selected);
    if (!selected) {
      setThumbnailError("Please select an image file");
      return;
    }
    /** To check if the file uploaded is an Image or not */
    if (!selected.type.includes("image")) {
      setThumbnailError("The File must be an image");
      return;
    }
    /** To check to file size */
    if (selected.size > 100000) {
      setThumbnailError("Image file must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up/ Register</h2>
        <label>
          <span>Company:</span>
          <input
            type="text"
            required
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
        </label>
        <label>
          <span>Tax Number:</span>
          <input
            type="text"
            required
            onChange={(e) => setTaxNumber(e.target.value)}
            value={taxNumber}
          />
        </label>
        <label>
          <span>Region:</span>
          <input
            type="text"
            required
            onChange={(e) => setRegion(e.target.value)}
            value={region}
          />
        </label>
        <label>
          <span>Username:</span>
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Profile Picture:</span>
          <input type="file" required onChange={handleFileChange} />
          {/** A box will disply the Thumbnail error */}
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {/** if the Thumbnail does not fulfill our requirement, the button to submit will be disabled */}
        {thumbnailError && (
          <button className="btn" disabled>
            Sign Up
          </button>
        )}
        {isPending && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {!thumbnailError && !isPending ? (
          <button className="btn">Sign Up</button>
        ) : null}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
