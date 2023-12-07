export const register = (
    jsonBody: any, 
    callback: (res: any) => void,
    errcallback: (res: any) => void = (_) => {}) => {
    fetch(`${ process.env.REACT_APP_API_URL }/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}