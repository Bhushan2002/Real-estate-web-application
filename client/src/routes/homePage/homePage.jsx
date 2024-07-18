import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import animationFile from "../../assets/house.json";
import Lottie from "lottie-react"

function HomePage() {

  
  // const {view} = useLottie(options);
  const {currentUser}  =  useContext(AuthContext);
  console.log(currentUser)
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover Your<br /> <span className="second-text">Dream Home</span> </h1>
          
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
      <Lottie animationData={animationFile}/>
        {/* <img src="/city-skyline-concept-illustration.png" alt=""/> */}
      </div>
    </div>
  );
}

export default HomePage;
