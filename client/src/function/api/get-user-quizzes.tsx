export const getUserQuizzes = (userId: number, then: (data: any) => void): void => {
    fetch(`${ process.env.REACT_APP_API_URL }/quiz/user/${ userId }`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => then(data))
    .catch(err => {
        // Toast erreur
        console.log(err);
    });
}