package com.shoppingmallcoco.project.service.comate;

import org.springframework.stereotype.Service;

import com.shoppingmallcoco.project.adaptor.SkinProfileAdaptor;
import com.shoppingmallcoco.project.entity.mypage.SkinProfile;
import com.shoppingmallcoco.project.repository.mypage.SkinRepository;
import com.shoppingmallcoco.project.util.MatchUtil;

import lombok.*;

@Service
@RequiredArgsConstructor
public class MatchingService {
	
	private final SkinRepository skinRepository;
	
	// 로그인 유저와 다른 사용자 매칭
	public int getUserMatch(Long loginMemNo, Long targetMemNo) {
		if (loginMemNo == null) return -1;
		
		SkinProfile loginSkin = skinRepository.findByMember_MemNo(loginMemNo).orElse(null);
		SkinProfile targetSkin = skinRepository.findByMember_MemNo(targetMemNo).orElse(null);
		
		// 스킨 정보 없으면 매칭률 0
		if (loginSkin == null || targetSkin == null) return 0;
		
		return MatchUtil.calculate(
				SkinProfileAdaptor.getSkinType(loginSkin), 
				SkinProfileAdaptor.getSkinConcern(loginSkin), 
				SkinProfileAdaptor.getPersonalColor(loginSkin),
				
				SkinProfileAdaptor.getSkinType(targetSkin), 
				SkinProfileAdaptor.getSkinConcern(targetSkin), 
				SkinProfileAdaptor.getPersonalColor(targetSkin)
				);
	}

}
