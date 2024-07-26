import { Linkedin, Github } from "lucide-react";
import "../CSS/About.css";
// import translation from "../translations/translation.js";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-us">About The Devs</h1>
      <ul className="developer-pro">
        <li className="developer">
          <h2>Anita</h2>
          {/* <p className="linkedin-link"></p> */}
          <p className="linkedin-link">
            <a
              href="https://www.linkedin.com/in/anitaowenny/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="linked-in" />
            </a>
            <a
              href="https://github.com/AnitaOwen"
              className="github-link"
              target="_blank"
            >
              <Github />
            </a>
          </p>
          <img
            className="dev-photo"
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1720015246/AnitaMagentaphoto1_dt1uea.jpg"
            alt="Anita!"
            width="300"
            height="300"
          />
          <hr />
          <h2>Armando</h2>
          <p className="linkedin-link">
            <a
              href="https://www.linkedin.com/in/armando-pires-aba0a121b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="linked-in" />
            </a>
            <a
              href="https://github.com/ArmandoPires103"
              className="github-link"
              target="_blank"
            >
              <Github />
            </a>
          </p>
          <img
            className="dev-photo"
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1720020802/Armando_Pires_2_lljm1y.jpg"
            alt="Armando!"
            width="300"
            height="300"
          />
          <hr />
          <h2>Brenda</h2>
          <p className="linkedin-link">
            <a
              href="https://www.linkedin.com/in/brendasotoct/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="linked-in" />
            </a>
            <a
              href="https://github.com/BSoto85"
              className="github-link"
              target="_blank"
            >
              <Github />
            </a>
          </p>
          <img
            className="dev-photo"
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1711388131/TeaWhips-Brenda_ybojtq.jpg"
            alt="Brenda!"
            width="300"
            height="300"
          />
          <hr />
          <h2>Luis</h2>
          <p className="linkedin-link">
            <a
              href="https://www.linkedin.com/in/luis-tejada-56538b271/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="linked-in" />
            </a>
            <a
              href="https://github.com/Blui322"
              className="github-link"
              target="_blank"
            >
              <Github />
            </a>
          </p>
          <img
            className="dev-photo"
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1720021062/Luis_Tejada_2_xyauz4.jpg"
            alt="Luis!"
            width="300"
            height="300"
          />
          <hr />
          <h2>Marlon</h2>
          <p className="linkedin-link">
            <a
              href="https://www.linkedin.com/in/mrmarlon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="linked-in" />
            </a>
            <a
              href="https://github.com/MarlonPelau"
              className="github-link"
              target="_blank"
            >
              <Github />
            </a>
          </p>
          <img
            className="dev-photo"
            src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1720539158/GlobalAgent-MR_ljphpa.jpg"
            alt="Marlon!"
            width="300"
            height="300"
          />
          <p className="linkedin-link">
            <a></a>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;
