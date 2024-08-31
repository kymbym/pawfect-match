const EditPetProfile = () => {

    const { petId } = useParams();
    const [petData, setPetData] = useState("");
    const { name, breed, gender, age, color, personality, adoptionStage, medicalHistory } = petData;
    console.log("token in editpetprofile", token)


    return (
        <>
        
        
        </>
    )
};

export default EditPetProfile;


// const handleEdit = async () => {
//     const updatedPetData = {
//     }

//     try {
//       const { pet } = await updatePet(petId, updatedPetData, token);
//       setPetData(pet);
//       alert("pet successfully updated")
//     } catch (error) {
//       console.error("error occurred while updating pet", error);
//     }
//   };