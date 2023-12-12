export const getQuizHistorical = (
    quiz_id: number,
    callback: (data: any) => void,
    errcallback: (err: any) => void = (_) => {}
): void => {

    fetch(`${ process.env.REACT_APP_API_URL }/hist/quiz/${quiz_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => errcallback(err));

}