export const fetchSearchQuizzes = (
    theme: string,
    id: string,
    callback: (data: any) => void,
    errcallback: (err: any) => void = (_) => {}
) => {
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/theme/${ theme }/not/${id}`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => errcallback(err));
}