export const isLoggedIn = () => {
    console.log(localStorage.getItem('user'))
    console.log("asdfdafds")
    console.log("is logged in" + localStorage.getItem('user') !== null)
    return localStorage.getItem('user') !== null
}