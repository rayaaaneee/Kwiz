import { AnswerInterface } from "../../components/page/create";
import { ToastType } from "../../components/toast";
import { Question } from "../../object/entity/question";
import { Quiz } from "../../object/entity/quiz";
import { ToastContextManager } from "../../object/toast-context-manager";


const verifyQuestion = (
    answers: Array<AnswerInterface>, 
    questionName: string,
    isUniqueAnswer: boolean, 
    HandleToasts: ToastContextManager,
): boolean => {

    // Vérifier si la question a des réposnes correctes
    let correctAnswers: number = answers.filter(answer => (answer.isAnswer === true)).length;
    let nbAnswers: number = answers.filter(answer => (answer.name.length > 0)).length;

    if (nbAnswers > 1) {

        if (correctAnswers > 0) {

            if ((isUniqueAnswer && (correctAnswers === 1)) || (!isUniqueAnswer && (correctAnswers > 1))) {
    
                if ((questionName !== undefined && questionName.length > 0)) {
    
                    return true;
    
                } else {
    
                    HandleToasts.push({
                        message: 'You have to set a question !',
                        type: ToastType.error,
                    });
    
                }
            } else {
    
                (!isUniqueAnswer && (correctAnswers <= 1)) && HandleToasts.push({
                    message: 'You have to set one correct answer !',
                    type: ToastType.error,
                });
    
                (isUniqueAnswer && (correctAnswers > 1)) && HandleToasts.push({
                    message: 'You have to set only one correct answer !',
                    type: ToastType.error,
                });
    
            }
    
        } else {
    
            !isUniqueAnswer && HandleToasts.push({
                message: 'You have to set at least one correct answer !',
                type: ToastType.error,
            });
    
            isUniqueAnswer && HandleToasts.push({
                message: 'You have to set one correct answer !',
                type: ToastType.error,
            });
    
        }
    } else {
        HandleToasts.push({
            message: 'You have to set at least two answers !',
            type: ToastType.error,
        });
    }

    return false;
}

export default verifyQuestion;