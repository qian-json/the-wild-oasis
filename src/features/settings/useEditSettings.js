import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins";
import toast from "react-hot-toast";
import {updateSetting} from "../../services/apiSettings";

export default function useEditSetting() {
  const queryClient = useQueryClient();

  const {isLoading: isEditing, mutate: editSetting} = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Changes saved");
      queryClient.invalidateQueries({queryKey: ["settings"]});
    },
    onError: err => toast.error(err.message),
  });

  return {isEditing, editSetting};
}
