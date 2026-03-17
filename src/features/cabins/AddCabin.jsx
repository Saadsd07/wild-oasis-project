import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

/** Modal compound component way */
function AddCabin() {

  return (
    <Modal>
    <Modal.Open opens="cabin-form">
      <Button>Add New Cabin</Button>
    </Modal.Open>
    <Modal.Window name="cabin-form">
      <CreateCabinForm />
    </Modal.Window>
   </Modal>

  //  <Modal>
  //   <Modal.Open opens="table">
  //     <Button>Add New Cabin</Button>
  //   </Modal.Open>
  //   <Modal.Window name="table">
  //     <CreateCabinForm />
  //   </Modal.Window>
  //  </Modal>
  );
}
/**modal normal way */
// function AddCabin() {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setShowForm((show) => !show)}>
//         Add new Cabin
//       </Button>
//       {showForm && (
//         <Modal onClose={() => setShowForm(false)}>
//           <CreateCabinForm onCloseModal={() => setShowForm(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
