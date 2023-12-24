export const deleteQuiz = (
    quiz_id: number,
    creator_id: number,
    callback: (res: any) => void, 
    errcallback: (err: any) => void = (err: void) => {}) => 
{
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quiz_id,
            creator_id,
        }),
    }).then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}