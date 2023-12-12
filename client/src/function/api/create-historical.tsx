export const createHistorical = (
    quiz_id: number,
    user_id: number,
    score: number,
    callback: (data: any) => void,
    errcallback: (err: any) => void = (_) => {}
): void => {

    fetch(`${ process.env.REACT_APP_API_URL }/hist/quiz/${quiz_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, score }),
    })
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => errcallback(err));

}