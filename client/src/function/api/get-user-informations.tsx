export const getUserInformations = (id: number, callback: (data: any) => void, errcallback: (err: any) => void) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => callback(data))
    .catch((err) => errcallback(err));
}