package com.shoppingmallcoco.project.util;

import java.util.List;

public class MatchUtil {

	public static int calculate(
			String typeA, List<String> concernA, String colorA,
			String typeB, List<String> concernB, String colorB
	) {
		int score = 0;
		
		/* 피부타입 매칭 (50점) */
		if (typeA != null && typeA.equals(typeB)) {
			score += 50;
		}
		
		/* 피부고민 매칭 (40점) */
		if (!concernA.isEmpty() && !concernB.isEmpty()) {
			int match = (int) concernA.stream().filter(concernB::contains).count();
			int max = Math.max(concernA.size(), concernB.size());
			score += (int) ((match/ (double) max) * 40);
		}
		
		/* 퍼스널컬러 매칭 (10점) */
		if (colorA != null && colorA.equals(colorB)) {
			score += 10;
		}
		
		return score;
	}
}
