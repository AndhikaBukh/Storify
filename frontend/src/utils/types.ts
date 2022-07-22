export interface userDataInterface {
	name?: string;
	username?: string;
	email?: string;
	bio?: string;
	gender?: string;

	followers?: object[];
	following?: object[];
	post?: object[];

	avatar?: File | undefined;
	banner?: File | undefined;
}
