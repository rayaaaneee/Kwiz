export const getAllQuizzes = (
    callback: (data: any) => void,
    errcallback: (err: any) => void = (err: any) => {}): void => {
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/all`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}