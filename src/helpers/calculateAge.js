// Helper function to calculate age from date of birth (dob)
const calculateAge = (dob) => {
    const birthDate = new Date(dob); // Create a Date object from dob
    const today = new Date(); // Get the current date
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate age
    const birthMonth = birthDate.getMonth(); // Get birth month
    const todayMonth = today.getMonth(); // Get current month
  
    // Adjust age if the current month/day is before the birth month/day
    if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age; // Return the calculated age
  };
  
  export default calculateAge;
  