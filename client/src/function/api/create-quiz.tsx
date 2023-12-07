export const createQuiz = (
    jsonBody: {}, 
    callback: (res: any) => void, 
    errcallback: (err: any) => void = (err: void) => {}) => 
{
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    }).then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}