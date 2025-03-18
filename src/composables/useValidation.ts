import { ref } from "vue";

export function useValidation() {
    const errors = ref<{ [key: string]: string }>({});

    const validateEmail = (email?: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!regex.test(email)) return "Invalid email format";
        return "";
    };

    const validatePassword = (password?: string) => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters long";
        return "";
    };

    const validateConfirmPassword = (password?: string, confirmPassword?: string) => {
        if (confirmPassword === undefined) return "";
        if (!confirmPassword) return "Please confirm your password";
        if (password !== confirmPassword) return "Passwords do not match";
        return "";
    };

    const validateName = (username?: string) => {
        if (username === undefined) return "";
        if (!username) return "Name is required";
        if (username.length < 2) return "Name must be at least 2 characters long";
        return "";
    };

    const validateForm = (fields: Partial<{ username: string; email: string; password: string; confirmPassword: string }>) => {
        errors.value = {};

        if ("name" in fields) {
            errors.value.name = validateName(fields.username);
        }
        if ("email" in fields) {
            errors.value.email = validateEmail(fields.email);
        }
        if ("password" in fields) {
            errors.value.password = validatePassword(fields.password);
        }
        if ("confirmPassword" in fields) {
            errors.value.confirmPassword = validateConfirmPassword(fields.password, fields.confirmPassword);
        }

        return Object.values(errors.value).every((err) => err === "");
    };

    return { errors, validateForm };
}
