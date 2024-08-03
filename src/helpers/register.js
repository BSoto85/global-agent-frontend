const URL = import.meta.env.VITE_BASE_URL

export const register = async (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // every field that is in the backend query should be here as well
    body: JSON.stringify({
      uid: user.uid,
      first_name: user.displayName ? user.displayName.split(" ")[0] : user.first_name,
      last_name: user.displayName ? user.displayName.split(" ")[1] : user.last_name,
      email: user.email,
      dob: user.dob ? user.dob : null,
      photo: null,
    }),
  }
  const response = await fetch(`${URL}/api/auth/register`, options)
  console.log("response from register helper", response)
  return response.json()
}
