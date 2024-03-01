import AuthModel from "./AuthModel";

class ProfileModel {
    async fetchProfile() {
        const response = await fetch('/api/users/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error fetching profile: ' + response.statusText);
        }
        return response.json();
    }

    async updateProfile(userDetails) {
        const response = await fetch('/api/users/update', { // Adjust the URL as needed
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });
        if (!response.ok) {
            throw new Error('Error updating profile');
        }
        return response.ok;
    }
}
export default ProfileModel;