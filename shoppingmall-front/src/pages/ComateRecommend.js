import React, { useEffect, useState } from 'react';
import { getRecommendation } from '../utils/comate_api';

const ComateRecommend = () => {
    const [recommendData, setRecommendData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecommend = async () => {
            try {
                const data = await getRecommendation();
                console.log("[추천 조회 결과]", data);

                setRecommendData(data);
            } catch (err) {
                console.error("추천 불러오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        loadRecommend();
    }, []);

    return (
        <div>
            COCO 만의 알고리즘을 활용해 사용자에게 꼭 맞는 추천 시스템을 제공합니다.
        </div>
    );
}

export default ComateRecommend;

