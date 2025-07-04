import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';

export class HuntressApi implements ICredentialType {
	name = 'huntressApi';
	displayName = 'Huntress API';
	documentationUrl = 'https://api.huntress.io/docs#introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
		  headers: {
			'Authorization': 'Basic {{$credentials.apiKey}}',
		  },
		},
	  };
}