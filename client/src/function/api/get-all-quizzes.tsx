export const getAllQuizzes = (
    not: string,
    callback: (data: any) => void,
    errcallback: (err: any) => void = (_) => {}): void => {
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/all/${not}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}