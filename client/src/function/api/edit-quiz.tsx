import { Quiz } from "../../object/entity/quiz";

export const editQuiz = (
    quiz: Quiz,
    callback: (err: any) => void,
    errcallback: (err: any) => void = (err) => {}
) => {
    fetch(
        `${process.env.REACT_APP_API_URL}/quiz/edit`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quiz: quiz.toJSON()})
        }
    )
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}