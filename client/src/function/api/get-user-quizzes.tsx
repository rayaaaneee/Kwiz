export const getUserQuizzes = (
    userId: number, 
    callback: (data: any) => void,
    errcallback: (err: any) => void = (err: any) => {}): void => 
{
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/user/${ userId }`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}