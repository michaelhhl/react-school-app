import http from "../utils/httpClient";
export interface Condition {
	categoryType?: string,
}

export interface UniversityScore {
	recordId: number,
	year: string,
	university: string,
	majorType: string,
	major: string,
	maxScore: number,
	minScore: number,
	averageScore: number,
	highLevel: number,
	lowLevel: number,
}

export function searchUniversityByCategoryType(condition: Condition) {
    return http.get('/score/category', condition);
}
