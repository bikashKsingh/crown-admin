import Swal, { SweetAlertResult } from "sweetalert2";

export async function deleteConfirmation(): Promise<SweetAlertResult> {
  const response: SweetAlertResult = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this record!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      popup: "p-1",
    },
    heightAuto: false,
  });

  return response;

  // .then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success",
  //     });
  //   }
  // });
}
