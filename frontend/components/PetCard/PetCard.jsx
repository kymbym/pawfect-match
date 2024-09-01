import {Link} from "react-router-dom";

export default function PetCard ({ pet, view }) {

  const petLink = (view === "partner") ? `/partner/pets/${pet._id}` : `/pets/${pet._id}`;

    return (
      <>
        <Link to={petLink}>
          <p>{pet.name}</p>
          <img src={pet.profilePhoto} alt={`photo of ${pet.name}`} />
        </Link>
      </>
    );
}