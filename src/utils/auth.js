const validateForm = (data, options = {}) => {
  const errors = {};
  const { requireImage = false } = options;

  if (!data?.name || data.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!data?.phone || data.phone.trim() === "") {
    errors.phone = "Phone is required";
  } else if (!/^[0-9]{10,15}$/.test(data.phone)) {
    errors.phone = "Phone must contain 10 to 15 digits";
  }

  if (!data?.age || data.age === "") {
    errors.age = "Age is required";
  } else {
    const age = Number(data.age);
    if (!Number.isInteger(age) || age < 1 || age > 100) {
      errors.age = "Age must be between 1 and 100";
    }
  }

  if (!data?.class || data.class.trim() === "") {
    errors.class = "Class is required";
  }

  if (!data?.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!data?.grade || data.grade.trim() === "") {
    errors.grade = "Grade is required";
  }

  if (data?.password !== undefined) {
    if (!data.password || data.password.trim() === "") {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  if (requireImage && !data?.image) {
    errors.image = "Please upload a student image";
  }

  return errors;
};

export default validateForm;
