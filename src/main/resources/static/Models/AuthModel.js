class AuthModel {
    constructor() {}

    login(credentials) {
        return fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
    }
}
export default AuthModel;