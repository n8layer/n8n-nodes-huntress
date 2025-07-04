import type { INodeProperties,  } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'account',
				],
			},
		},
		options: [
			{
				name: 'Get Account',
				value: 'getAccount',
				action: 'Get account by ID',
				routing: {
					request: {
						method: 'GET',
						url: '/account',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedAccount: '={{ $parameter.extractAccount ? $response.body.account : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedAccount',
								}
							}
						]
					}
				},
			},
		],
		default: 'getAccount',
	},
];

export const accountFields: INodeProperties[] = [
	{
		displayName: 'Extract Account',
		name: 'extractAccount',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAccount'],
			},
		},
		default: true,
		description: 'Whether to extract the account from the response',
	},
];