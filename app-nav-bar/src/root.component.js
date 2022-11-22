import { BrowserRouter, Link } from "react-router-dom";
import Sidebar from "./components/side-bar";
import "./main.css";
export default function Root(props) {
  return (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
}
