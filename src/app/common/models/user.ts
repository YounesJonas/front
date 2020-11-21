

export class User{
    private id: Number;
    private username: String;
    private firstname: String;
    private lastname: String;
    private email: String;
    private password: String;

    getId = () => {
        return this.id;
    }
    setId = (id: Number) => {
        this.id = id;
    }
    
    getUsername = () => {
        return this.username;
    }
    setUsername = (username: String) => {
        this.username = username;
    }

    getPassword = () => {
        return this.password;
    }
    setPassword = (password: String) => {
        this.password = password;
    }

    getFirstname = () => {
        return this.firstname;
    }
    setFirstname = (firstname: String) => {
        this.firstname = firstname;
    }

    getLastname = () => {
        return this.lastname;
    }
    setLastname = (lastname: String) => {
        this.lastname = lastname;
    }

    getEmail = () => {
        return this.email;
    }
    setEmail = (email: String) => {
        this.email = email;
    }

}
