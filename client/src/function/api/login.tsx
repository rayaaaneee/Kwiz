export const login = (
    jsonBody: {}, 
    callback: (res: any) => void,
    errcallback: (res: any) => void = (err: any) => {}) => 
{
    fetch(`${ process.env.REACT_APP_API_URL }/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    }).then(res => res.json()).then(data => callback(data))
    .catch(err => errcallback(err));
}