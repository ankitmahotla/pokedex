import Navbar from "./components/Navbar";
import Home from "./screens/Home";
export default function App() {
  return (
    <>
      <Navbar />
      <div className="mt-36 md:mt-20">
        <Home />
      </div>
    </>
  );
}
