import styled from './article.module.css';
import articleImage from '../../assets/images/15.png';
function Article(props){

    console.log(props.article.id)
    return (
        <div className={styled.articleWrapper}>
           
            <img src={articleImage}  />
            <h4>{props.article.id}:  {props.article.name}</h4>
            <span> {props.article.bio}</span>
        </div>
    );
}
export default Article;