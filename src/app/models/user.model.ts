export interface User {
    id: string;
    _id: string;
    name: string;
    email: string;
    isAdmin: Boolean;
    photo: string;
    password: string;
    confirmPassword: string;
}