

// access user name from local storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

// remove token from session storage
export const logout = next => {
    if (window !== 'undefined') {
        localStorage.clear('token');
        localStorage.clear('user');
    }
    next();
};
