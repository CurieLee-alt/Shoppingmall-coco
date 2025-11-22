import edit from '../images/edit.svg'
import del from '../images/delete.svg'
import { useNavigate } from 'react-router-dom'
import UseStarRating from '../features/UseStarRating.js'
import { useState, useEffect } from 'react'
import greyStar from '../images/greyStar.svg'
import yellowStar from '../images/yellowStar.svg'
import detailIcon from '../images/detailIcon.svg'
import love from '../images/love.png'
import '../css/ReviewDetail.css'
import axios from 'axios'
import { isLoggedIn } from '../utils/api'
function ReviewDetail({ reviewData, onDelete }) {
    const navigate = useNavigate();

    const {
        reviewNo,
        userNickname,
        createdAt,
        rating,
        content,
        prosTags,
        consTags,
        reviewImages,
        likeCount
    } = reviewData;

    const [like, setlike] = useState(likeCount || 0);
    const [isExpanded, setIsExpanded] = useState(false);

    const { starTotal, clicked, starArray, setRating } = UseStarRating(0);

    // 자신이 리뷰한 내용에만 수정 삭제 아이콘 보이기 
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        setRating(rating);
        setlike(likeCount || 0);
    }, [rating, likeCount]);

    const updateReview = () => {
        navigate(`/update-reviews/${reviewNo}`);
    }

    const deleteReview = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            axios.delete(`/reviews/${reviewNo}`).then(response => {
                onDelete(reviewNo);
            })
        }
    }

    const addLike = async () => {
        if (!isLoggedIn()) {
            alert('로그인이 필요합니다.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/reviews/${reviewNo}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const updatedLikeCount = await response.json();
                setlike(updatedLikeCount);
            } else {
                const error = await response.json();
                alert(error.message || '좋아요 처리에 실패했습니다.');
            }
        } catch (error) {
            console.error('좋아요 처리 오류:', error);
            alert('좋아요 처리에 실패했습니다.');
        }
    }

    return (

        <div className="reviewBox">
            <div className="headBox">
                <div className="name-star">
                    <span className='username'>{userNickname}</span>
                    <div className='stars'>
                        {starArray.map((stars, i) => (
                            <img
                                key={i}
                                src={clicked[i] ? yellowStar : greyStar}
                            />
                        ))}
                    </div>
                </div>
                <div className="date-edit">
                    <span className='date'>{createdAt ? createdAt.split('T')[0] : ''}</span>
                    <img className="icon-btn" src={edit} onClick={updateReview} />
                    <img className="icon-btn" src={del} onClick={deleteReview} />
                </div>
            </div>
            <div className='imgBox'>
                {reviewImages && reviewImages.map((img, i) => (
                    <img className="tag" key={i} src={img.imageUrl} alt="리뷰 이미지" />
                ))}
            </div>
            <div className="tagBox">
                {prosTags && prosTags.map((ptag, i) => (
                    <span key={`p-${i}`}>{ptag.tagName}</span>
                ))}
                {consTags && consTags.map((ntag, i) => (
                    <span key={`n-${i}`}>{ntag.tagName}</span>
                ))}
            </div>
            <div className="textBox">
                <p className={isExpanded ? 'expanded' : 'clamped'}>
                    {content}
                </p>
            </div>
            <div
                className={`detail-box ${isExpanded ? 'expanded' : ''}`}
                onClick={toggleExpand}
            >
                <img src={detailIcon} alt={isExpanded ? '접기' : '더보기'} />
                <span>{isExpanded ? '간략히 보기' : '더보기'}</span>
            </div>
            <div className='like'>
                <img src={love} onClick={addLike} />
                <span>{like}</span>
            </div>
        </div>

    );
}

export default ReviewDetail;