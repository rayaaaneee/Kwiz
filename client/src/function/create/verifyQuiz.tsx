import { ToastType } from "../../components/toast";
import { Quiz } from "../../object/entity/quiz";
import { ToastContextManager } from "../../object/toast-context-manager";

const verifyQuiz = (
    theme: string,
    quiz: Quiz,
    HandleToasts: ToastContextManager,
): boolean => {
    if ((theme !== undefined && theme.length !== 0)) {

        if (quiz.questions.length > 0) {

            return true;
        } else {


            HandleToasts.push({
                message: 'Please add at least one question !',
                type: ToastType.error,
            });
        }
    } else {
        HandleToasts.push({
            message: 'You have to set a theme !',
            type: ToastType.error,
        });
    }
    return false;
}

export default verifyQuiz;