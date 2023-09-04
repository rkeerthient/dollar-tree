export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export default interface Ce_blogs {
	datePosted?: string,
	primaryPhoto?: ComplexImage,
	description?: string,
	name: string,
	c_blogsCategory?: string,
	c_subcategory?: string,
	c_type?: string,
	id: string,
}
