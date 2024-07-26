import { Link } from "react-router-dom";
import "../CSS/FofView.css";

const FofView = () => {
  return (
    <div className="fof-view">
      <h1>Oops, Meow! Nothing here Sherlock!</h1>
      <img
        src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1721751689/GlobalAgent-404Cat_xzhr0s.png"
        alt="DeteCat"
      />
      <Link to={"/"}>Back to Global Agent</Link>
    </div>
  );
};

export default FofView;