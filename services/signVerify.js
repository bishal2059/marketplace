const signInDataVerification = async function (userData) {
  return new Promise((resolve, reject) => {
    if (!userData.firstName) {
      reject({ firstName: "First Name is required" });
    }
    if (!userData.lastName) {
      reject({ lastName: "Last Name is required" });
    }

    if (!userData.dateOfBirth) {
      reject({ dateOfBirth: "Date of Birth is required" });
    }
    if (userData.dateOfBirth) {
      try {
        const dob = new Date(userData.dateOfBirth);
        if (!isFinite(dob.valueOf())) throw new Error("Invalid Date of Birth");
        if (
          new Date().getFullYear() - dob.getFullYear() < 15 ||
          new Date().getFullYear() - dob.getFullYear() > 100
        ) {
          reject({ dateOfBirth: "Required age is 15 to 100" });
        } else {
          userData.age = new Date().getFullYear() - dob.getFullYear();
        }
      } catch (err) {
        reject({ dateOfBirth: err.message });
      }
    }
    if (!userData.age) {
      reject({ age: "Age is required" });
    }
    if (!isFinite(userData.age)) {
      reject({ age: "Invalid age" });
    }
    if (!userData.gender) {
      reject({ gender: "Gender is required" });
    }
    if (!userData.phoneNo) {
      reject({ phoneNo: "Phone no is required" });
    }
    if (!userData.email) {
      reject({ email: "Email is required" });
    }
    if (!userData.userName) {
      reject({ userName: "UserName is required" });
    }
    if (!userData.password) {
      reject({ password: "Password is required" });
    }
    if (!userData.cpassword) {
      reject({ cpassword: "Confirm password is required" });
    }
    if (userData.password !== userData.cpassword) {
      reject({ cpassword: "Password and confirm password doesn't match" });
    }
    resolve(userData);
  });
};

module.exports = {
  signInDataVerification,
};
