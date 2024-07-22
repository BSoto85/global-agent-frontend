import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { auth } from "./helpers/firebase";

import Login from "./Components/Login";
import SignUpView from "./Pages/SignUpView.jsx";
import Test from './Components/Test'
import HomePage from './Pages/HomePage'
import CountriesPage from './Pages/CountriesPage.jsx'
import LeaderboardPage from './Pages/LeaderboardPage.jsx'
import CaseFilesPage from './Pages/CaseFilesPage.jsx'
import CaseDetailsPage from './Pages/CaseDetailsPage.jsx'
import QuestionsPage from './Pages/QuestionsPage.jsx'
import ResultsPage from './Pages/ResultPage.jsx'
import AboutPage from './Pages/AboutPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'


function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserProfileAndStats = async () => {
      if (user) {
        try {
          const profileResponse = await fetch(`http://localhost:3003/api/profile/${user.uid}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const profileData = await profileResponse.json();
          setUserProfile(profileData);

          const statsResponse = await fetch(`http://localhost:3003/api/stats/${profileData.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const statsData = await statsResponse.json();
          setUserStats(statsData);
          console.log(statsData)
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch profile or stats:', error);
          setIsLoading(false);
        }
      }
    };

    fetchUserProfileAndStats();
  }, [user]);

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
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile/:userUid" element={<ProfilePage user={userProfile} isLoading={isLoading} stats={userStats}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/countries" element={user ? <CountriesPage countries={countries} /> : <Navigate to="/login" />} />
        <Route path="/countries/:countryId/casefiles" element={user ? <CaseFilesPage countries={countries} /> : <Navigate to="/login" />} />
        <Route path="/countries/:countryId/case_files/:caseFileId" element={user ? <CaseDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/countries/:countryId/case_files/:caseFileId/questions"  element={user ? <QuestionsPage user={userProfile} /> : <Navigate to="/login" />} />
        <Route path="/countries/:countryId/case_files/:caseFileId/questions/results" element={user ? <ResultsPage userStats={userStats} userProfile={userProfile} /> : <Navigate to="/login" />} />     
        </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;
