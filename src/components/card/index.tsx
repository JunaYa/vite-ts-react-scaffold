import "./index.css";
const Card = () => {
  return (
    <div className="card">
      <div className="top">
        <span> CSS</span>
        <h2 className="heading">@property</h2>
      </div>
      <p>
        The @property rule must include both the syntax and inherits descriptors;
        if either are missing, the entire @property rule is invalid and ignored.
        The initial-value descriptor is also required, unless the syntax is the
        * universal syntax definition.
      </p>
    </div>
  );  
};

export default Card;
