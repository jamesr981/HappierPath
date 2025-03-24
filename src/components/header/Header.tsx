const Header = () => {
  return (
    <div className="header">
      <h1>HappierPath</h1>
      <p id="tagline">
        <span className="darkBlue">:))</span> ... because everything is still
        relative
        <button id="closeButton" onClick={() => window.close()}>
          X
        </button>
      </p>
    </div>
  );
};

export default Header;
