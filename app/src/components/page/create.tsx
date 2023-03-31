import { useParams } from 'react-router-dom';
import '../../css/page/create.css';
import { InputText } from '../template/input-text';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { Button } from '../template/button';
import { ChangeEvent } from 'react';

 const Create = (): JSX.Element => {

    const {id} = useParams();

    const titleText = id === undefined ? 'Nouveau quiz' : 'Modifier le quiz';

    return (
        <>
            <GreenContainer className="" children={
                <h1>{titleText}</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="create-container theme-container flex-row align-center justify-start" children={
                        <>
                            <h1 className='no-bold'>Thème -</h1>
                            <InputText id="theme" placeholder="" value=""/>
                        </>
                    }/>
                    <GreenContainer className="create-container new-question-container flex-column flex-center" children={
                        <>
                            <div className="enter-question-container flex-row align-center justify-start">
                                <h1 className='no-bold'>Nouvelle Question -</h1>
                                <InputText id="question" placeholder="" value=""/>
                            </div>
                            <div className="grid-answers">
                                <div className="1"></div>
                                <div className="2"></div>
                                <div className="3"></div>
                                <div className="4"></div>
                            </div>
                            <Button id="validateQuestion" onClick={() => {}} text="OK"/>
                        </>
                    }/>
                    <GreenContainer className="create-container questions-container flex-row align-center justify-start" children={
                        <>
                            <h1 className='no-bold'>Questions du quizz :</h1>
                        </>
                    }/>
                    <div className="validate-button-container flex align-center justify-end">
                        <Button id="validate" onClick={() => {}} text="Valider"/>
                    </div>
                </>
            }/>
        </>
    );
}

export default Create;