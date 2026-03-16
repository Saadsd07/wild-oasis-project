import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Failed to fetch cabins");
  }

  return data;
}

export const createEditCabin = async (newCabin, id) => {
  // console.log("newCabin in apiCabins:", newCabin);
  // console.log("id in apiCabins:", id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}` 

  let query = supabase.from("cabins")

  // A: CREATE
  if (!id) query = query.insert([{...newCabin, image: imagePath}]);

  //B: EDIT
  if (id) query = query.update({...newCabin, image: imagePath}).eq("id", id);

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error);
    throw new Error("Failed to create cabin");
  }

  if(hasImagePath) return data;

  const {error:storageError} = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

  if(storageError) {
    await supabase.from("cabins").delete().eq("id", data.id)
    console.error(storageError);
    throw new Error("Failed to upload cabin image - cabin was not created");
  }
  return data;
};

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch cabins");
  }
  console.log("Deleted cabin with id:", id);
  return data;
}
