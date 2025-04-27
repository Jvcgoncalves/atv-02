import { Link } from "react-router";
import "./home.scss";

export default function Home() {
  return (
    <div className="main-container">
      <Link to={"/tailwind"} className="button"> Tailwind</Link>
      <Link to={"/styled-components"} className="button"> Styled Components </Link>
    </div>
  )
}