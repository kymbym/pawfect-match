import {Link} from "react-router-dom";

export default function PetCard ({pet}) {
    return (
      <>
        <Link to={`/pets/${pet._id}`}>
          <p>image link here dont forget alt</p>
          <p>{pet.name}</p>
        </Link>
      </>
    );
}