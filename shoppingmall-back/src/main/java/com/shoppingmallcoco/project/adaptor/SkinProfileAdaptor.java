package com.shoppingmallcoco.project.adaptor;

import java.util.Arrays;
import java.util.List;

import com.shoppingmallcoco.project.entity.mypage.SkinProfile;

public class SkinProfileAdaptor {

	public static String getSkinType(SkinProfile profile) {
		return profile != null ? profile.getSkinType() : "";
	}
	
	public static List<String> getSkinConcern(SkinProfile profile) {
		if (profile == null || profile.getSkinConcern() == null || profile.getSkinConcern().isBlank()) {
			return List.of();
		}
		
		return Arrays.stream(profile.getSkinConcern().split(","))
					.map(String::trim)
					.toList();
	}
	
	public static String getPersonalColor(SkinProfile profile) {
		return profile != null ? profile.getPersonalColor() : "";
	}
}
