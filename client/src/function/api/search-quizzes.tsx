export const fetchSearchQuizzes = (
    theme: string,
    callback: (data: any) => void,
    errcallback: (err: any) => void = (_) => {}
) => {
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/theme/${ theme }`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => errcallback(err));
}