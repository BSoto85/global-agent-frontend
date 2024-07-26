import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import { getUserData } from './helpers/getUserData.js'

import { auth } from "./helpers/firebase";

import Login from "./Components/Login";
import SignUpView from "./Pages/SignUpView.jsx";
// import Profile from './Components/Profile'

import Test from "./Components/Test";
import HomePage from "./Pages/HomePage";
import CountriesPage from "./Pages/CountriesPage.jsx";
import LeaderboardPage from "./Pages/LeaderboardPage.jsx";
import CaseFilesPage from "./Pages/CaseFilesPage.jsx";
import CaseDetailsPage from "./Pages/CaseDetailsPage.jsx";
import CasePhotosPage from "./Pages/CasePhotosPage.jsx";
import QuestionsPage from "./Pages/QuestionsPage.jsx";
import ResultsPage from "./Pages/ResultPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProfilePage from "./Pages/ProfilePage.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import ProfilePage from "./Pages/ProfilePage.jsx";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, []);

	// PROP FOR COUNTRY FETCH
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch("http://localhost:3003/api/countries");
				const data = await response.json();
				setCountries(data);
			} catch (error) {
				console.error("Error fetching countries:", error);
			}
		};

		fetchCountries();
	}, []);

	return (
		<div>
			<Routes
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 100,
				}}
			>
				{/* <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        /> */}
				<Route path="/" element={<HomePage />} />
				<Route path="/test" element={user ? <Test /> : <Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<SignUpView />} />
				<Route path="/profile/:userUid" element={<ProfilePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/leaderboard" element={<LeaderboardPage />} />
				{/* <Route path="/achievements" element={<AchievementsPage />} /> */}
				<Route
					path="/countries"
					element={
						user ? (
							<CountriesPage countries={countries} />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/countries/:countryId/casefiles"
					element={
						user ? (
							<CaseFilesPage countries={countries} />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/countries/:countryId/case_files/:caseFileId"
					element={user ? <CaseDetailsPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/countries/:countryId/case_files/:caseFileId/photos"
					element={user ? <CasePhotosPage /> : <Navigate to="/login" />}
				/>
				<Route
					path=":userUid/countries/:countryId/case_files/:caseFileId/questions"
					element={user ? <QuestionsPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/countries/:countryId/case_files/:caseFileId/questions/results/:score/:totalQuestions"
					element={user ? <ResultsPage /> : <Navigate to="/login" />}
				/>

				{/* <Route path="*" element={<FourOFourPage />} /> */}
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
