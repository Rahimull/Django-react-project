import styled from './article.module.css';
import articleImage from '../../assets/images/15.png';
function Article(){

    return (
        <div className={styled.articleWrapper}>
           
            <img src={articleImage}  />
            <h3>متغیر ها در ریکت</h3>
            <span> خواندن 5 دقیقه ای</span>
        </div>
    );
}
export default Article;