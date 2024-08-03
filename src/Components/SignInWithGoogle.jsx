import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";
import { fetchUser } from "../helpers/fetchUser";

import googleBadge from "../assets/google.png";

async function handleGoogleSignIn(setUser) {
  const provider = new GoogleAuthProvider()
  try {
    //sign into Firebase
    const { user } = await signInWithPopup(auth, provider)
    //retrieve JWT token from firebase
    const token = await user.getIdToken()
    localStorage.setItem('token', token)

    // Check if user exists in your backend
    console.log("USER from signinto firebase", user)
    const foundUser = await fetchUser(user, token)
    if (!foundUser.uid) {
      // let photoURL = ""
      // User does not exist in backend, create the user
      const newUser = await register(user)
      // console.log(newUser)
      await setUser({ uid: newUser.uid });
    }
    // return key/value to use for the navigate in the googleLogin function below
    return { navigateTo: `/profile/${user.uid}}` }
  } catch (error) {
    localStorage.removeItem('token')
    throw error
  }
}

function SignInWithGoogle({setUser}) {
	const navigate = useNavigate();

	const googleLogin = async () => {
		try {
			const result = await handleGoogleSignIn(setUser);
			navigate(result.navigateTo);
		} catch (error) {
			toast.error(error.message, {
				position: "bottom-center",
			});
		}
	};

	return (
		<div
			/*style={{ cursor: "pointer" }}*/ onClick={googleLogin}
			className="google-sign-in"
		>
			<img src={googleBadge} width={"30%"} />
		</div>
	);
}

export default SignInWithGoogle;
