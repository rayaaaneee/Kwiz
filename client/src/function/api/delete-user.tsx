export const deleteUser = (
    id: number,
    currentPassword: string,
    callback: (data: any) => void,
    errcallback: (err: any) => void = (_) => {}
): void => {
    fetch(`${ process.env.REACT_APP_API_URL }/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword })
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));

} 