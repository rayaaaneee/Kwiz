import Menu from "../menu";

import { Container } from "../template/container";
import { MainContainerPage } from "../template/main-container-page";
import { Title } from "../template/title";

const P404 = () => {

    document.title = "Page not found - Kwiz";

    return (
    <Menu>
        <MainContainerPage>
            <>
                <Title text="404 Page not found"/>
                <Container>
                    <div className="flex flex-start flex-column" style={{ rowGap: '20px' }}>
                        <h2 style={{ textAlign: 'center' }}>This page doesn't exists.</h2>
                        <svg 
                          style={{ width: '150px', height: '150px', margin: 'auto'}}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24">
                          <path
                            fill="#fff"
                            fillRule="nonzero"
                            d="M5.843 4.559a8.707 8.707 0 0 1 12.514 12.107l-.2.207a434.13 434.13 0 0 1-4.593 4.486 2.25 2.25 0 0 1-3.128 0l-3.85-3.749c-.284-.28-.532-.526-.743-.737a8.707 8.707 0 0 1 0-12.314Zm11.253 1.06A7.207 7.207 0 0 0 6.904 15.813L8.6 17.484c.783.765 1.742 1.697 2.879 2.797a.75.75 0 0 0 1.043 0l2.974-2.89a212.31 212.31 0 0 0 1.6-1.579 7.207 7.207 0 0 0 0-10.192Zm-2.15 1.994.084.073a.75.75 0 0 1 .073.976l-.073.084-1.969 1.97 1.97 1.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073-1.97-1.97-1.97 1.97a.75.75 0 0 1-.976.073l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084 1.969-1.97-1.97-1.97a.75.75 0 0 1-.072-.976l.073-.084a.75.75 0 0 1 .976-.073l.084.073L12 9.655l1.97-1.97a.75.75 0 0 1 .976-.072Z"
                          />
                        </svg>
                    </div>
                </Container>
            </>
        </MainContainerPage>
    </Menu>
)};

export default P404;