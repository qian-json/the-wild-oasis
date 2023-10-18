import supabase, {supabaseKey, supabaseUrl} from "./supabase";

export async function getCabins() {
  const {data, error} = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded: ${error.message}`);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin]
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{...newCabin, image: imagePath}]);

  // B) EDIT
  if (id)
    query = query
      .update({...newCabin, image: imagePath})
      .eq("id", id)
      .select();

  const {data, error} = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created: ${error.message}`);
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const {storageError} = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      `Image could not be uploaded. Cabin not created: ${storageError.message}`
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const {data, error} = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin #${id} could not be deleted: ${error.message}`);
  }

  return data;
}
