export class Seeker
{
	clientId: string;
	name: string;
	avatar: string;
	rating: number;

	constructor(clientId: string, name: string, avatar: string, rating: number)
	{
		this.clientId = clientId;
		this.name = name;
		this.avatar = avatar
		this.rating = rating;
	}
}