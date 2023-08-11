export interface ComplexVideo {
	url: string,
	video?: string,
	description?: string,
}

export default interface Ce_video {
	datePosted?: string,
	landingPageUrl?: string,
	description?: string,
	name: string,
	id: string,
	videos?: ComplexVideo[],
}
