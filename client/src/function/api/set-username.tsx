export const setUsername  = (username: string, currentPassword: string, id: number,
    callback: (res: any) => void,
    errcallback: (res: any) => void = (_) => {}
): void => {
    fetch(`${ process.env.REACT_APP_API_URL }/user/username/${ id }`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, currentPassword })
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}