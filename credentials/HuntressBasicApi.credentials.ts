import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class HuntressBasicApi implements ICredentialType {
	name = 'huntressBasicApi';
	extends = ['httpBasicAuth'];
	displayName = 'Huntress Basic API';
	documentationUrl = 'https://api.huntress.io/docs#introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'User',
			name: 'user',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.user}}',
				password: '={{$credentials.password}}',
			},
		},
	};
}