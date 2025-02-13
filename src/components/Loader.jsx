import * as reactBootstrap from "react-bootstrap";

function Loader() {
  return (
    <div className="loader">
      <reactBootstrap.Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </reactBootstrap.Spinner>
    </div>
  );
}

export default Loader;