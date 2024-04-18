
import "./skeleton.css";

const CardSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div className="movieSkeleton"></div>
      ))}
    </>
  );
};


export default CardSkeleton;

